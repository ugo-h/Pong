import Shape from '../Graphics/Shape';
import config from '../config';
var { WIDTH, HEIGHT } = config; 

export const paddles = [];

export function Paddle(y, maxA, maxVel, {ai}) {
    this.x = WIDTH/2
    this.height = 10;
    this.width = 75;
    Shape.call(this, this.x, y, this.width, this.height);
    this.ax = 0;
    this.maxA = maxA;
    this.maxVel = maxVel;
    this.ai = !!ai;
    paddles.push(this)
  }
  Paddle.prototype = Object.create(Shape.prototype);
  Paddle.prototype.checkBoundsX = function() {
    if(this.x > WIDTH-this.width) {
      this.x = WIDTH-this.width;
    } else if(this.x < 0 + this.width) {
      this.x = 0 + this.width;
    }
  }
  Paddle.prototype.update = function(target, opponent) {
    this.checkBoundsX();
    if(this.vx >= this.maxVel || this.vx <= -this.maxVel){
      this.ax = 0;
    }
    this.x += this.vx;
    this.vx += this.ax;
    if(this.ai) {
      if(this.x+this.width*0.75 < target.x+target.width
       && (Math.abs(this.y-target.y) < HEIGHT/2.2 
       || Math.abs(this.x-target.x) > this.width*5.5 )){
        this.vx = this.maxVel;
        this.ax=0;
      } else if(this.x-this.width*0.75 > target.x-target.width
             && (Math.abs(this.y-target.y) < HEIGHT/2.2 
             || Math.abs(this.x-target.x) > this.width*5.5 )) {
        this.vx = -this.maxVel;
        this.ax=0;
      } else {
      // this.ax = -this.ax;
        this.vx = 0;
        if(Math.max(target.y, this.y) - 30 <= Math.min(target.y, this.y)) {
          this.vx = this.x<opponent.x?this.maxVel:-this.maxVel;
        }
      //  this.ax = -this.ax*0.5
        
      }
    }
  }
  