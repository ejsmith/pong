part of pong_server;

class ServerPongGame extends PongGame {
  WebSocketConnection wsPlayer1;
  WebSocketConnection wsPlayer2;
  
  ServerPongGame(WebSocketConnection connection) : super(new Rectangle(0, 0, 960, 600)){
    addPlayer(connection);
    start();
  }
  
  void _handleMessage(Paddle player, String message){
    var messageData = JSON.parse(message);
    for (var item in messageData) {
      switch (item['n']) {
        case 20:
          player.y = item['d']['y'];
          break;
      }
    }
  }
  
  void update(){
    if (wsPlayer2 != null) {
      var player1Message = [{
          'n': 10,
          'd': {
            'b' : player1.bullet,
            'h' : player1.height,
            's' : player1.score,
            'y' : player1.y,
          }
        }, {
          'n': 20,
          'd': {
            'b' : player2.bullet,
            'h' : player2.height,
            's' : player2.score,
            'y' : player2.y
          }
        }];
      
      wsPlayer1.send(JSON.stringify(player1Message));
    }
    
      if(wsPlayer2 != null) {
        var player2Message = [{
            'n': 20,
            'd': {
              'b' : player1.bullet,
              'h' : player1.height,
              's' : player1.score,
              'y' : player1.y
            }
          }, {
            'n': 10,
            'd': {
              'b' : player2.bullet,
              'h' : player2.height,
              's' : player2.score,
              'y' : player2.y
            }
          }];
        
        wsPlayer2.send(JSON.stringify(player2Message));
    }
  }
  
  bool addPlayer(WebSocketConnection connection){
    if (connection == null) {
      throw new ArgumentError("connection");
    }
    
    if (!canAddPlayer) {
      throw new UnsupportedError("This game session is full.");
    }
    
    connection.onMessage = (message) {
      _handleMessage(_getPlayer(connection), message as String);
    };
    
    connection.onClosed = (int status, String reason) {
      _print('Closed with $status for $reason');
      _removePlayer(connection);
    };
    
    if (wsPlayer1 == null){
      wsPlayer1 = connection;
    } else {
      wsPlayer2 = connection;
    }
  }
  
  Paddle _getPlayer(WebSocketConnection connection) {
    if (wsPlayer1 == connection){
      return player1;
    }
    
    if (wsPlayer2 == connection){
      return player2;
    }
    
    return null;
  }
  
  void _removePlayer(WebSocketConnection connection) {
    if (wsPlayer1 == connection){
      wsPlayer1.close();
      wsPlayer1 = null;
      player1 = null; 
    } else {
      wsPlayer2.close();
      wsPlayer2 = null;
      player2 = null; 
    }
    
    newGame();
  }
  
  bool get canAddPlayer => wsPlayer1 == null || wsPlayer2 == null;
}
