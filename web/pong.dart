import "dart:html";
import "package:pong/pong_game.dart";
import "package:pong/pong_html.dart";
import "package:dgame/dgame.dart";
import "package:dgame/dgame_html.dart";

void main() {
  var game = new PongGameClient();
  game.sound.enabled = true;
  //game.debugMode = false;
  game.start();  
}

