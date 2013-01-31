part of pong_game;

class ClientPaddle extends Paddle {
  ClientPaddle(PongGame game, num x, num y, [String Name = "Un-named"]) : super(game, x, y) {
    name = Name;
  }
  
  void move() {
    if (game.input.mouse != null)
      y = game.input.mouse.y;
    
    if (game.input.click != null)
      fire();
    
    super.move();
  }
}
