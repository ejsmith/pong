part of pong_html;

class PongGameRenderer extends CanvasGameRenderer<PongGame> {
  num y;
  num n;
  
  PowerUpRenderer powerUpRenderer;
  
  PongGameRenderer(String targetId) : super(targetId) {
    powerUpRenderer = new PowerUpRenderer(this);
  }
  
  void init() {
    game.levelWins[1] = window.localStorage.containsKey('win1') ? int.parse(window.localStorage['win1']) : 0;
    game.levelWins[2] = window.localStorage.containsKey('win2') ? int.parse(window.localStorage['win2']) : 0;
    game.levelWins[3] = window.localStorage.containsKey('win3') ? int.parse(window.localStorage['win3']) : 0;
    game.levelWins[4] = window.localStorage.containsKey('win4') ? int.parse(window.localStorage['win4']) : 0;
    game.gamesPlayed = window.localStorage.containsKey('gamesPlayed') ? int.parse(window.localStorage['gamesPlayed']) : 0;
    game.longestRally = window.localStorage.containsKey('longestRally') ? int.parse(window.localStorage['longestRally']) : 0;

    game.onGameOver.listen((e) => gameOver());
    game.onBallHit.listen((p) => doPaddleHitEffect(p));
    game.onPointOver.listen((e) => bgFade());
  }
  
  void gameOver() {
    bgFade();
    window.localStorage['win1'] = game.levelWins[1].toString();
    window.localStorage['win2'] = game.levelWins[2].toString();
    window.localStorage['win3'] = game.levelWins[3].toString();
    window.localStorage['win4'] = game.levelWins[4].toString();
    window.localStorage['gamesPlayed'] = game.gamesPlayed.toString();
  }
  
  GameEntityRenderer getRenderer(GameEntity e) {
    if (game.countdown > 0 || game.waiting > 0 && (e is Ball || e is Paddle || e is PowerUp))
      return null;
    
    if (e is PowerUp)
      return powerUpRenderer;
    
    return super.getRenderer(e);
  }
  
  void drawBeforeCtxRestore() {
    drawMiddleLine();
    if (game.player1 != null && game.player2 != null)
      drawScore();
    drawCountDown();
    drawWaitDots();
    
    super.drawBeforeCtxRestore();
  }
  
  void drawCountDown() {
    if (game.countdown == 0)
      return;

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "54px cinnamoncake, Verdana";
    ctx.fillText("${game.countdown}", -7, 0);
  }
  
  void drawWaitDots() {
    if (game.connected)
      return;

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "32px cinnamoncake, Verdana";
    
    if (game.waiting == 1)
      ctx.fillText("Waiting For Connection", -140, 0);
    else if (game.waiting == 2)
      ctx.fillText("Waiting For Connection .", -140, 0);
    else if (game.waiting == 3)
      ctx.fillText("Waiting For Connection . .", -140, 0);
    else if (game.waiting == 4)
      ctx.fillText("Waiting For Connection . . .", -140, 0);
  }
  
  void drawDebugInfo() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "16px Verdana";
    ctx.fillText("V: ${game.ball.momentum.xVel.toStringAsFixed(0)}", -(game.rect.halfWidth - 20), -(game.rect.halfHeight - 30));
    super.drawDebugInfo();
  }
  
  void drawScore() {  
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("${game.player1.score}              ${game.player2.score}", -60, -(game.rect.halfHeight - 30));
  }
  
  void drawMiddleLine() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    RenderUtils.drawDashedLine(ctx, 0, -(game.rect.halfHeight), 0, game.rect.halfHeight);
    ctx.stroke();
  }
  
  void doPaddleHitEffect(Paddle paddle) {
    subtleBgFade();
    paddle.opacity = 0.5;
    new Timer(const Duration(milliseconds: 50), () => paddle.opacity = 0.4);
    new Timer(const Duration(milliseconds: 100), () => paddle.opacity = 0.3);
    new Timer(const Duration(milliseconds: 150), () => paddle.opacity = 0.2);
  }
  
  void subtleBgFade() {
    game.bgStyle = "rgba(0, 0, 0, 0.84)";
    new Timer(const Duration(milliseconds: 25), () => game.bgStyle = "rgba(0, 0, 0, 0.83)");
    new Timer(const Duration(milliseconds: 50), () => game.bgStyle = "rgba(0, 0, 0, 0.82)");
    new Timer(const Duration(milliseconds: 75), () => game.bgStyle = "rgba(0, 0, 0, 0.81)");
    new Timer(const Duration(milliseconds: 100), () => game.bgStyle = "rgba(0, 0, 0, 0.82)");
    new Timer(const Duration(milliseconds: 125), () => game.bgStyle = "rgba(0, 0, 0, 0.83)");
    new Timer(const Duration(milliseconds: 150), () => game.bgStyle = "rgba(0, 0, 0, 0.84)");
    new Timer(const Duration(milliseconds: 175), () => game.bgStyle = "rgba(0, 0, 0, 0.85)");
  }
  
  void bgFade() {
    game.bgStyle = "rgba(0, 0, 0, 0.8)";
    new Timer(const Duration(milliseconds: 25), () => game.bgStyle = "rgba(0, 0, 0, 0.75)");
    new Timer(const Duration(milliseconds: 50), () => game.bgStyle = "rgba(0, 0, 0, 0.70)");
    new Timer(const Duration(milliseconds: 75), () => game.bgStyle = "rgba(0, 0, 0, 0.65)");
    new Timer(const Duration(milliseconds: 100), () => game.bgStyle = "rgba(0, 0, 0, 0.60)");
    new Timer(const Duration(milliseconds: 125), () => game.bgStyle = "rgba(0, 0, 0, 0.55)");
    new Timer(const Duration(milliseconds: 150), () => game.bgStyle = "rgba(0, 0, 0, 0.60)");
    new Timer(const Duration(milliseconds: 175), () => game.bgStyle = "rgba(0, 0, 0, 0.65)");
    new Timer(const Duration(milliseconds: 200), () => game.bgStyle = "rgba(0, 0, 0, 0.70)");
    new Timer(const Duration(milliseconds: 225), () => game.bgStyle = "rgba(0, 0, 0, 0.75)");
    new Timer(const Duration(milliseconds: 250), () => game.bgStyle = "rgba(0, 0, 0, 0.80)");
    new Timer(const Duration(milliseconds: 275), () => game.bgStyle = "rgba(0, 0, 0, 0.85)");
  }
}
