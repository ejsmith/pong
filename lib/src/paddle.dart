part of pong_game;

class Paddle extends GameEntity<PongGame> {
  num score = 0;
  num bullet = 0;
  num amountMoved = 0;
  num prevY = 0;
  String name;
  
  Paddle(PongGame game, num x, num y) : super.withPosition(game, x, y, 8, 120) {
    opacity = 0.2;
  }
  
  void update() {
    if (game.state == PongGameState.paused || game.state == PongGameState.gameOver || game.state == PongGameState.waiting || game.countdown > 0 || game.waiting > 0|| !enabled)
      return;
    
    move();
    
    if (y != prevY)
      prevY = y;
    
    super.update();
  }
  
  void move() {
    if (y + 60 > game.ball.y && y - 60 < game.ball.y && (game.ball.x < x + 40 || game.ball.x > x - 40)) {
      amountMoved += prevY - y;
    }
  }
  
  void fire() {
    if (bullet <= 0)
      return;
    
    game.addEntity(new Bullet(game, x > 0 ? x - 10 : x + 10, y, x > 0 ? -200 : 200));
    
    bullet--;
  }
}
