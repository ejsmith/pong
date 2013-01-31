part of pong_game;

class ComputerPaddle extends Paddle {
  // target the top, middle or bottom of the paddle
  num targetPaddleSide = 0;
  // used to introduce some variation to where the AI hits the ball or possibly even misses it.
  num targetOffset = 0;
  num amountToMove = 3;
  bool ballComing;
  // Computer skill level between 1 and 3;
  num _skillLevel;
  num lastBulletTime = 0;
  
  ComputerPaddle(PongGame game, num x, num y, [int skillLevel = 1]) : super(game, x, y) {
    _skillLevel = Math.max(Math.min(skillLevel, 3), 1);
    if (skillLevel == 1)
      name = "Beginner Computer";
    else if (skillLevel == 2)
      name = "Adept Computer";
    else if (skillLevel == 3)
      name = "Expert Computer";
    else if (skillLevel == 4)
      name = "Extreme Computer";
    else
      name = "Computer";
  }
  
  int get skillLevel => _skillLevel;
  
  void move()
  {
    if (game.ball == null)
      return;
    
    if (lastBulletTime + .25 <= game.timer.gameTime)
    {
      if (game.player2.bullet >= 1) {
        if (y + 60 >= game.player1.y && y - 60 <= game.player1.y)
        {
          lastBulletTime = game.timer.gameTime;
          fire();
        }
      }
      
      super.move();
    }
    
    // detect if the ball is coming towards us or away from us
    bool newBallComing = (x > 0 && game.ball.momentum.xVel > 0) || (x < 0 && game.ball.momentum.xVel < 0);
    // if the direction changed, then set a new random target
    if (ballComing == null || newBallComing != ballComing) {
      // randomly pick if we should target the top, middle or bottom of the paddle
      targetPaddleSide = random(-1, 1, true);
      // introduce some target hit spot variation based on skill level
      targetOffset = getTargetOffset();
      // the amount to move based on skill level
      amountToMove = getAmountToMove();
    }
    ballComing = newBallComing;
    
    // either move toward the ball or toward the middle of the screen
    num targetPosition = ballComing ?
        game.ball.y + (targetPaddleSide * ((height / 2) - 5))
        : 0;
        
    if (ballComing && (game.ball.x < x + 20 || game.ball.x > x - 20))
      if (game.ball.momentum.yVel > 0)
        targetPosition += 20;
      else
        targetPosition -= 20;
    // add random variation
    //targetPosition += targetOffset;
    
    // if we are within 1 of our targetPosition, just stay there.
    if ((y - targetPosition).abs() <= 1)
      return;
    
    // move toward targetPosition
    if (y > targetPosition)
      y -= amountToMove;
    else
      y += amountToMove;
  }
  
  num getAmountToMove() {
    num n = random(0, 100);
    switch (_skillLevel) {
      case 1:
        if (n >= 60) // 40% chance for 3
          return 3;
        if (n >= 10) // 50% chance for 2
          return 2;
        
        return 1; // 10% chance for 1
      case 2:
        if (n >= 60) // 40% chance for 4
          return 4;
        if (n >= 10) // 50% chance for 3
          return 3;
        
        return 2; // 10% chance for 2
      case 3:
        if (n >= 60) // 40% chance for 4
          return 5;
        if (n >= 10) // 50% chance for 3
          return 4;
        
        return 3; // 10% chance for 2
      case 4:
        return 6;
    }
    
    return 3;
  }
  
  num getTargetOffset() {
    switch (_skillLevel) {
      case 1:
        return random(-20, 20, true);
      case 2:
        return random(-10, 10, true);
      case 3:
        return random(-5, 5, true);
      case 4:
        return 0;
    }
    
    return 0;
  }
}
