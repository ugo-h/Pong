import config from "../config";

const { SHOW_CENTERS, DEFAULT_COLOR } = config;

function Point2d(x, y){
    this.x = x;
    this.y = y;
  }
  
  function Shape(x, y, width, height) {
    Point2d.call(this, x, y);
    this.color = DEFAULT_COLOR;
    this.dColor = DEFAULT_COLOR;
    this.width = width*0.5;
    this.height = height*0.5;
    this.vy = 0;
    this.vx = 0;
  }
  
  Shape.prototype = {
    draw: function(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x-this.width, this.y+this.height,
        this.width*2, -this.height*2
     );
     if(SHOW_CENTERS){
       ctx.fillStyle = 'red';
       ctx.fillRect(
        this.x-2.5, this.y-2.5, 5, 5
        )
      }
    },
    update: function() {
      
    }
  };
  
  export default Shape;