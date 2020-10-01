
function Point2d(x, y){
  this.x = x;
  this.y = y;
}
class Shape extends Point2d {
    constructor(x, y, width, height, color, isStatic=false, showCenter=false) {
        super(this, x, y);
        this.color = color;
        this.dColor = color;
        this.width = width*0.5;
        this.height = height*0.5;
        this.vx = 0;
    }

    draw(context) {
    ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x-this.width, this.y+this.height,
        this.width*2, -this.height*2
     );
     if(this.showCenter){
       ctx.fillStyle = 'red';
       ctx.fillRect(
        this.x-2.5, this.y-2.5, 5, 5
        )
      }
    },
    }
  }
  
  Shape.prototype = {
    draw: function(ctx) {
      
    update: function() {
      
    }
  };
  
  