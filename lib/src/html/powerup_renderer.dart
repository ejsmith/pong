part of pong_html;

class PowerUpRenderer extends DefaultCanvasEntityRenderer<PowerUp> {
  PowerUpRenderer(PongGameRenderer gr) : super(gr);
  
  void render(PowerUp e) {
    super.render(e);
    
    gr.ctx.fillStyle = "rgba(0, 0, 0, .5)";
    gr.ctx.font = "24px Verdana";
    
    switch (e.type) {
      case 'reflector':      
        gr.ctx.fillText("R", e.x - 8, e.y + 8);
        break;
      case 'extendor':
        gr.ctx.fillText("E", e.x - 8, e.y + 8);
        break;
      case 'shrink':
        gr.ctx.fillText("S", e.x - 8, e.y + 8);
        break;
      case 'bullet':
        gr.ctx.fillText("B", e.x - 8, e.y + 8);
        break;
      case 'speedUp':
        gr.ctx.fillText("U", e.x - 8, e.y + 8);
        break;
      case 'slowDown':
        gr.ctx.fillText("D", e.x - 8, e.y + 8);
        break;
    }
  }
}
