part of pong_game;

class Bullet extends GameEntity<PongGame> {
  Bullet(PongGame game, num x, num y, num xVel) : super.withPosition(game, x, y, 8, 8) {
    momentum.xVel = xVel;
    color = "255, 0, 0";
  }
  
  void update() {
    if (collidesWith(game.player1)) {
      game.player1.y += 1000;
      game.player1.enabled = false;
      removeFromGame();
    } else if (collidesWith(game.player2)) {
      game.player2.y += 1000;
      game.player2.enabled = false;
      removeFromGame();
    }
    
    super.update();
  }
}