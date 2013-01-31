library game_server;

import "dart:io";
import "dart:isolate";
import "dart:json" as JSON;
import "package:pong/pong_game.dart";
import "package:dgame/dgame.dart";

part "server_pong_game.dart";
part "static_file_handler.dart";
part "not_found_handler.dart";

List<ServerPongGame> _games;

void main() {
  HttpServer httpServer = new HttpServer();
  WebSocketHandler webSocketHandler = new WebSocketHandler();
  StaticFileHandler fileHandler = new StaticFileHandler("${new Directory.current().path}/web");
  httpServer.addRequestHandler((HttpRequest req) => req.path == "/ws", webSocketHandler.onRequest);
  httpServer.addRequestHandler((req) => true, (req,res) => fileHandler.onRequest(req, res));
  
  _games = new List<ServerPongGame>();
  webSocketHandler.onOpen = (c) => onClientConnected(c);
  
  httpServer.listen('127.0.0.1', 8000);
  _print('listening on: http://127.0.0.1:8000');
}

void onClientConnected(WebSocketConnection connection) {    
  if(_games.length == 0) {
    _print("Creating new game instance.");
    _games.add(new ServerPongGame(connection));
    return;
  }
  
  for(var game in _games){
    if(game.canAddPlayer){
      _print("Adding player to existing game instance.");
      game.addPlayer(connection);
      return;
    }
  }

  _print("All games are full. Creating new game instance.");
  _games.add(new ServerPongGame(connection));
}

_print(String message){
  print("[Server] $message");
}
