part of pong_html;

class PongGameClient extends PongGame {
  WebSocket _ws;
  String _serverUrl = "ws://localhost:8000/ws";
  List<String> _messageQueue;
  
  PongGameClient([String serverUrl = "ws://localhost:8000/ws"]) 
    : super.withServices(new HtmlGameSound(), new HtmlGameInput(), new PongGameRenderer("surface"), new HtmlGameLoop()) {
    
    _messageQueue = new List<String>();
    _serverUrl = serverUrl;
  }
  
  void start() {
    connect();
    super.start();
  }
  
  void update() {
    while (_messageQueue.length > 0) {
      var message = _messageQueue.removeAt(0);
      var messageData = JSON.parse(message);
      for (var item in messageData) {
        switch (item['n']) {
          case 10:
            player1.bullet = item['d']['b'];
            player1.height = item['d']['h'];
            player1.score = item['d']['s'];
            player1.x = item['d']['x'];
            break;
          case 20:
            player2.bullet = item['d']['b'];
            player2.height = item['d']['h'];
            player2.score = item['d']['s'];
            player2.x = item['d']['x'];
            break;
        }
      }
    }

    super.update();
    
    if (isConnected) {
      var msgs = [{
          'n': 20,
          'd': {
            'y' : player1.y
          }
        }];
      
      sendMessage(JSON.stringify(msgs)); 
    }
  }
  
//  Paddle createOpponent() {
//    if(!isConnecting && !isConnected) {
//      _print("Creating CPU opponent.");
//      return super.createOpponent();
//    }
//
//    _print("Creating Remote opponent.");
//    return new Paddle.withPosition(this, rect.halfWidth - 10, 10, 3);
//  }
  
  void handleMessage(MessageEvent e){
    _messageQueue.add(e.data);
  }
    
  void sendMessage(String message) {
    if(message.isEmpty) {
      return;
    }
    
    if (!isConnected) {
      throw new Exception("You must be connected to the server before sending a message.");
    }
    
    _ws.send(message);
  }
  
  bool get isConnecting => _ws != null && (_ws.readyState == WebSocket.CONNECTING);
  bool get isConnected => _ws != null && (_ws.readyState == WebSocket.OPEN);
    
  bool connect() {
    _print("Connecting to server.");
    
    if(isConnecting || isConnected) {
      _print("Already connected.");
      return true;
    }
    
    try {
      _ws = new WebSocket(_serverUrl);
    } catch (e){
      _print("Failed to connect to server $e.ToString()");
      
       return false;
    }
    
    _ws.onOpen.listen((Event c) {
      _print("Connected to $c");
    });
    
    _ws.onClose.listen((CloseEvent c) {
      _print("Disconnected from $c");
    });
    
    _ws.onMessage.listen((MessageEvent e) {
      handleMessage(e);
    });
    
    _ws.onError.listen((Event e) {
      _print("An error occurred: $e");
    });
    
    return true;
  }
  
  bool disconnect() {
    if (_ws == null)
      return true;
    
    try {
      if (isConnecting || isConnected){
        _ws.close(0, "Client disconnected");
      }
      
      _ws = null;
      _messageQueue.clear();
    } catch (e){
      _print(e.toString());
      return false;
    }
    
    return true;
  }
  
  _print(String message){
    print("[Client] $message");
  }
}