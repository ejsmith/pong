part of pong_game;

class PowerUp extends GameEntity<PongGame> {
  String type;
  num creationTime = 0;
  
  PowerUp(PongGame game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    num rType = random(1, 6, true);
    creationTime = game.timer.gameTime;
    
    if (rType == 1) {
      color = "255, 255, 255";
      type = 'reflector';
    } else if (rType == 2) {
      color = "255, 255, 0";
      type = 'extendor';
    } else if (rType == 3) {
      color = "255, 0, 255";
      type = 'shrink';
    } else if (rType == 4) {
      color = "0, 255, 255";
      type = 'bullet';
    } else if (rType == 5){
      color = "0, 255, 0";
      type = 'speedUp';
    } else if (rType == 6) {
      color = "255, 155, 155";
      type = 'slowDown';
    } else {
      color = "0, 255, 0";
      type = 'slowDown';
    }
  }
  
  void update() {
    if (creationTime + 10 <= game.timer.gameTime)
      removeFromGame();
    
    if (collidesWith(game.ball)) {
      switch (type) {
        case 'reflector':
          reflectorUpdate();
          break;
        case 'extendor':
          extendUpdate();
          break;
        case 'shrink':
          shrinkUpdate();
          break;
        case 'bullet':
          if (game.ball.momentum.xVel > 0)
            game.player1.bullet += 2;
          else if (game.ball.momentum.xVel < 0)
            game.player2.bullet += 2;
          break;
        case 'speedUp':
          if (game.ball.momentum.xVel > 0)
            game.ball.momentum.xVel += 200;
          else if (game.ball.momentum.xVel < 0)
            game.ball.momentum.xVel -= 200;
          break;
        case 'slowDown':
          if (game.ball.momentum.xVel > 0)
            game.ball.momentum.xVel -= 200;
          else if (game.ball.momentum.xVel < 0)
            game.ball.momentum.xVel += 200;
          break;
      }
      
      game.sound.play("sweep", .1);
      removeFromGame();
    }
   
    super.update();
  }
  
  
  void reflectorUpdate() {
    if (random() > .5)
      game.ball.momentum.yVel = random(200, 600);
    else
      game.ball.momentum.yVel = random(-200, -600);
  }
  
  void extendUpdate() {
    if (game.ball.momentum.xVel > 0)
      game.player1.height += 50;
    else if (game.ball.momentum.xVel < 0)
      game.player2.height += 50;
  }
  
  void shrinkUpdate() {
    if (game.ball.momentum.xVel > 0)
      game.player1.height -= 50;
    else if (game.ball.momentum.xVel < 0)
      game.player2.height -= 50;
  }
}
