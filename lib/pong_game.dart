library pong_game;

import "dart:math" as Math;
import "dart:async";
import 'package:dgame/dgame.dart';
import 'package:event_stream/event_stream.dart';

part 'src/paddle.dart';
part 'src/client_paddle.dart';
part 'src/computer_paddle.dart';
part 'src/ball.dart';
part 'src/powerup.dart';
part 'src/bullet.dart';

class PongGame extends Game {
  num lastPowerUp = 5;
  num difficulty = 2;
  num _state;
  num _countdown = 0;
  num _waiting = 0;
  Map<num, num> levelWins = new Map<num,num>();
  num longestRally = 0;
  num gamesPlayed = 0;
  num _rally = 0;
  bool connected = false;
  bool cancel = false;
  Timer _countdownTimer;
  Timer _waitingTimer;
  
  Paddle player1;
  Paddle player2;
  Ball ball;
  
  PongGame(Rectangle rect) : super(rect);
  PongGame.withServices(GameSound sound, GameInput input, GameRenderer renderer, GameLoop loop) : super.withServices(sound, input, renderer, loop); 
  
  num get state => _state;
  set state(num value) {
    if (_state == value)
      return;
    
    _state = value;
    disableEntitiesByGroup("welcome");
    disableEntitiesByGroup("gameOver");
    disableEntitiesByGroup("computerPick");
    disableEntitiesByGroup("paused");
    disableEntitiesByGroup("stats");
    disableEntitiesByGroup("waiting");
    
    if (_state == PongGameState.welcome)
      enableEntitiesByGroup("welcome");
    else if (_state == PongGameState.gameOver)
      enableEntitiesByGroup("gameOver");
    else if (_state == PongGameState.computerPick)
      enableEntitiesByGroup("computerPick");
    else if (_state == PongGameState.paused)
      enableEntitiesByGroup("paused");
    else if (_state == PongGameState.stats)
      enableEntitiesByGroup("stats");
    else if (_state == PongGameState.waiting)
      enableEntitiesByGroup("waiting");
  }
  
  void start() {  
    ball = new Ball(this, 0, 0);
    addEntity(ball);
    
    ball.momentum.xVel = ball.startVel;
    
    player1 = new ComputerPaddle(this, -(rect.halfWidth - 10), 10, difficulty);
    addEntity(player1);
  
    player2 = new ComputerPaddle(this, rect.halfWidth - 10, 10, difficulty);
    addEntity(player2);
    
    if (!levelWins.containsKey(1))
      levelWins[1] = 0;
    if (!levelWins.containsKey(2))
      levelWins[2] = 0;
    if (!levelWins.containsKey(3))
      levelWins[3] = 0;
    if (!levelWins.containsKey(4))
      levelWins[4] = 0;
    
    createWelcomeMenu();
    createComputerPickMenu();
    createPausedMenu();
    createWaitingMenu();
    
    state = PongGameState.welcome;
    
    super.start();
  }
  
  void update() {
    if (state == PongGameState.playing || state == PongGameState.paused) {
      if (player1.score >= 10 || player2.score >= 10)
        gameOver();
      
      if (input.keyCode == 27)
        state = state == PongGameState.paused ? PongGameState.playing : PongGameState.paused;
      
      if (state == PongGameState.playing)
        randomPowerUps();
      
      if (_rally > longestRally)
        longestRally = _rally;
    }
    
    if (state == PongGameState.gameOver) {
      player1.enabled = false;
      player2.enabled = false;
      ball.enabled = false;
    }
    
    super.update();
  }
  
  num get countdown => _countdown;
  set countdown(num value) {
    _countdown = value;
    if (_countdownTimer != null)
      _countdownTimer.cancel();
    
    disableEntitiesByGroup("gameOver");
    disableEntitiesByGroup("welcome");
    disableEntitiesByGroup("computerPick");
    disableEntitiesByGroup("paused");
    disableEntitiesByGroup("stats");
    disableEntitiesByGroup("waiting");
    
    _countdownTimer = new Timer.repeating(const Duration(milliseconds: 1000), (t) {
      if (_countdown > 0) 
        _countdown--; 
      else {
        state = PongGameState.playing;
        t.cancel();
      }
    });
  }
  
  num get waiting => _waiting;
  set waiting(num value) {
    _waiting = value;
    if (_waitingTimer != null)
      _waitingTimer.cancel();
    
    disableEntitiesByGroup("gameOver");
    disableEntitiesByGroup("welcome");
    disableEntitiesByGroup("computerPick");
    disableEntitiesByGroup("paused");
    disableEntitiesByGroup("stats");
    
    _waitingTimer = new Timer.repeating(const Duration(milliseconds: 1000), (t) {    
      if (!connected && state == PongGameState.waiting && !cancel)
        _waiting++;
      else {
        _waiting = 0;
        state = PongGameState.welcome;
        t.cancel();
      }
      
      if (_waiting == 5)
        _waiting = 1;
    });
  }
  
  void randomPowerUps() {
    if (entities.where((e) => e is PowerUp).length >= 5)
      return;
    
    if (timer.gameTime < 5)
      return;
    
    if (lastPowerUp + 4 > timer.gameTime)
      return;
    
    var powerUp = new PowerUp(this, 0, 0);
    
    do {
      powerUp.x = random(-rect.halfWidth + 100, rect.halfWidth - 100);
      powerUp.y = random(-rect.halfHeight + 50, rect.halfHeight - 50);
      
    } while (entities.where((e) => e is PowerUp).any((e) => powerUp.collidesWith(e)));
    
    lastPowerUp = timer.gameTime;
    addEntity(powerUp);
  }
  
  void ballHit(Paddle paddle) {
    _ballHitEvent.signal(paddle);
  }
  
  void gameOver() {
    sound.play("sweep");
    _gameOverEvent.signal();
    
    bool win;
    win = (player1.score >= 10 || player2.score >= 10);
    
    if (win) {
      levelWins[difficulty] += 1;
      
      removeEntitiesByFilter((e) => e is PowerUp);
      removeEntitiesByFilter((e) => e is Bullet);
      
      removeEntitiesByGroup("gameOver");
      
      createGameOverMenu();
      
      state = PongGameState.gameOver;
    } else {
      resetPoint();
    }
  }
  
  void createGameOverMenu() {
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -97, 
        text: player1.score >= 10 ? "${player1.name} won!" : "${player2.name} won!",
        size: 56,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "gameOver"));
    
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -31, 
        text: "Play again?",
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "gameOver"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 15, 
        text: "Yes", 
        buttonAction: () {
          newGame();
          newGameAgainstComputer("Player 1");
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "gameOver"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 60, 
        text: "No", 
        buttonAction: () { 
          removeEntitiesByFilter((e) => e is PowerUp);
          removeEntitiesByFilter((e) => e is Bullet);
          
          if (player1 != null)
            player1.removeFromGame();
          
          if (player2 != null)
            player2.removeFromGame();
          
          if (ball != null)
            ball.removeFromGame();
          
          ball = new Ball(this, 0, 0);
          addEntity(ball);
          
          ball.momentum.xVel = ball.startVel;
          
          player1 = new ComputerPaddle(this, -(rect.halfWidth - 10), 10, difficulty);
          addEntity(player1);
          
          player2 = new ComputerPaddle(this, rect.halfWidth - 10, 10, difficulty);
          addEntity(player2);
          
          state = PongGameState.welcome;
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "gameOver"));
    
    disableEntitiesByGroup("gameOver");
  }
  
  void createWelcomeMenu() {
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -97, 
        text: "Welcome to Pong!",
        size: 56,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "welcome"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: -31, 
        text: "Play Computer", 
        buttonAction: () { 
          state = PongGameState.computerPick;
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "welcome"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 15, 
        text: "Play Against A Friend", 
        buttonAction: () { 
          state = PongGameState.waiting;
          waiting = 1;
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "welcome"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 60, 
        text: "Statistics", 
        buttonAction: () { 
          removeEntitiesByGroup("stats");
          createStatsMenu();
          
          state = PongGameState.stats;
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "welcome"));
    
    disableEntitiesByGroup("welcome");
  }
  
  void createWaitingMenu() {
    addEntity(new GameButton(game: this, 
        x: -420, 
        y: -280, 
        text: "Back", 
        buttonAction: () {
          cancel = true;
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "waiting"));
    
    disableEntitiesByGroup("waiting");
  }
  
  void createComputerPickMenu() {
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -97, 
        text: "Computer Difficulty",
        size: 56,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "computerPick"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: -31, 
        text: "Level 1", 
        buttonAction: () { 
          newGameAgainstComputer("Player 1", 1);
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "computerPick"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 15, 
        text: "Level 2", 
        buttonAction: () { 
          newGameAgainstComputer("Player 1", 2);
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "computerPick"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 60, 
        text: "Level 3", 
        buttonAction: () { 
          newGameAgainstComputer("Player 1", 3);
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "computerPick"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 105, 
        text: "Extreme", 
        buttonAction: () { 
          newGameAgainstComputer("Player 1", 4);
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "computerPick"));
    
    addEntity(new GameButton(game: this, 
        x: -420, 
        y: -280, 
        text: "Back", 
        buttonAction: () { 
          state = PongGameState.welcome;
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "computerPick"));
    
    disableEntitiesByGroup("computerPick");
  }
  
  void createStatsMenu() {
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -160, 
        text: "Statistics",
        size: 56,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -94, 
        text: "Level 1 Wins: ${levelWins[1]}",
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -49, 
        text: "Level 2 Wins: ${levelWins[2]}",
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -10, 
        text: "Level 3 Wins: ${levelWins[3]}",
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameText(game: this, 
        x: 0, 
        y: 29, 
        text: "Extreme Wins: ${levelWins[4]}",
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameText(game: this, 
        x: 0, 
        y: 74, 
        text: "Total Games: ${gamesPlayed}",
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameText(game: this, 
        x: 0, 
        y: 119, 
        text: "Longest Rally: ${longestRally}",
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameButton(game: this,
        x: 0, 
        y: 164, 
        text: "RESET", 
        buttonAction: () { 
          resetStats();
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    addEntity(new GameButton(game: this, 
        x: -420, 
        y: -280, 
        text: "Back", 
        buttonAction: () { 
          state = PongGameState.welcome;
          
          _gameOverEvent.signal();
          sound.play("sweep");        
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "stats"));
    
    disableEntitiesByGroup("stats");
  }
  
  void createPausedMenu() {
    addEntity(new GameText(game: this, 
        x: 0, 
        y: -31, 
        text: "PAUSED",
        size: 56,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "paused"));
    
    addEntity(new GameButton(game: this, 
        x: 0, 
        y: 15, 
        text: "Quit", 
        buttonAction: () {  
          removeEntitiesByFilter((e) => e is PowerUp);
          removeEntitiesByFilter((e) => e is Bullet);
          
          if (player1 != null)
            player1.removeFromGame();
          
          if (player2 != null)
            player2.removeFromGame();
          
          if (ball != null)
            ball.removeFromGame();
          
          ball = new Ball(this, 0, 0);
          addEntity(ball);
          
          ball.momentum.xVel = ball.startVel;
          
          player1 = new ComputerPaddle(this, -(rect.halfWidth - 10), 10, difficulty);
          addEntity(player1);
          
          player2 = new ComputerPaddle(this, rect.halfWidth - 10, 10, difficulty);
          addEntity(player2);
          
          state = PongGameState.welcome;
          
          _gameOverEvent.signal();
          sound.play("sweep");
        },
        size: 36,
        font: "cinnamoncake, Verdana",
        centered: true,
        color: "255, 255, 255",
        opacity: 0.4,
        id: "",
        groupId: "paused"));
    
    disableEntitiesByGroup("paused");
  }
  
  // TODO: Add a states for playing against a friend or opponent.
  // TODO: For Friend: Add screen that says "Please paste url to friend" Below that "Waiting. . ." <-- Dots appear 1 by 1 then dissapear and loops.
  // TODO: For Random Opponent: Add screen that says "Waiting for Opponent. . ." Repeating dots like above.
  
  void newGameAgainstComputer(String name, [num diff = null]) {
    if (diff != null)
      difficulty = diff;
    
    if (player1 != null)
      player1.removeFromGame();
    
    if (player2 != null)
      player2.removeFromGame();
    
    player1 = new ClientPaddle(this, -(rect.halfWidth - 10), 10, name);
    addEntity(player1);
  
    player2 = new ComputerPaddle(this, rect.halfWidth - 10, 10, difficulty);
    addEntity(player2);
    
    gamesPlayed++;
    
    newGame();
    
    countdown = 3;
  }
  
  void resetStats() {
    levelWins[1] = 0;
    levelWins[2] = 0;
    levelWins[3] = 0;
    levelWins[4] = 0;
    gamesPlayed = 0;
    longestRally = 0;
    
    state = PongGameState.welcome;
    
    removeEntitiesByGroup("stats");
    createStatsMenu();
    
    state = PongGameState.stats;
  }
  
  void reset() {   
    if(!ball.enabled)
      ball.enabled = true;
    
    if(ball == null) {
      ball = new Ball(this, 0, 0);
      addEntity(ball);
    }

    ball.y = 0;
    ball.spin = 0;
    
    if (!player1.enabled)
      player1.enabled = true;
    
    player1.height = 120;
    player1.amountMoved = 0;
    player1.opacity = 0.2;
    
    if (!player2.enabled)
      player2.enabled = true;
    
    player2.y = 0;
    player2.amountMoved = 0;
    player2.height = 120;
    player2.opacity = 0.2;
    
    removeEntitiesByFilter((e) => e is PowerUp);
    removeEntitiesByFilter((e) => e is Bullet);
    
    ball.momentum.xVel = ball.startVel;
  }
  
  void resetPoint() {
    reset();
    
    if (random(0, 1) > .5)
      ball.momentum.yVel = random(0, 200);
    else
      ball.momentum.yVel = random(-200, 0);
  }
  
  void newGame() {
    reset();
    
    if (state != PongGameState.welcome || state != PongGameState.computerPick)
      state = PongGameState.playing;
    
    player1.score = 0;
    player2.score = 0;
  }
  
  Paddle createPlayer() {
    return new ClientPaddle(this, -(rect.halfWidth - 10), 10);
  }
  
  Paddle createOpponent() {
    return new ComputerPaddle(this, rect.halfWidth - 10, 10, difficulty);
  }
  
  final EventStream _pointOverEvent = new EventStream();
  Stream get onPointOver => _pointOverEvent.stream;
  
  final EventStream _gameOverEvent = new EventStream();
  Stream get onGameOver => _gameOverEvent.stream;
  
  final EventStream<Paddle> _ballHitEvent = new EventStream<Paddle>();
  Stream<Paddle> get onBallHit => _ballHitEvent.stream;
}

class PongGameState {
  static final num welcome = 1;
  static final num paused = 2;
  static final num playing = 3;
  static final num gameOver = 4;
  static final num computerPick = 5;
  static final num stats = 6;
  static final num waiting = 7;
}
