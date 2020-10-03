import Shape from '../Graphics/Shape';
import config from '../config';
const { WIDTH, HEIGHT } = config; 

export const paddles = [];

export class Paddle  extends Shape{
  constructor(y, { velocity, isControlledByAi }) {
    super(WIDTH/2, y, 75, 10);
    this.ax = 0;
    this.maxA = 0.8;
    this.maxVel = velocity? velocity: 7;
    this.isControlledByAi = isControlledByAi? isControlledByAi: true;
    paddles.push(this)
  };
  
  update(target, opponent) {
    this.checkBoundsX();
    if(this.vx >= this.maxVel || this.vx <= -this.maxVel){
      this.ax = 0;
    }
    this.x += this.vx;
    this.vx += this.ax;
    if(this.isControlledByAi) {
      this.handleAi(target, opponent);
    } 
  };
  
  checkBoundsX() {
    if(this.x > WIDTH-this.width) {
      this.x = WIDTH-this.width;
    } else if(this.x < 0 + this.width) {
      this.x = 0 + this.width;
    }
  };
  
  handleAi(target, opponent) {
    if(this.x + this.width*0.75 < target.x + target.width
      && (Math.abs(this.y - target.y) < HEIGHT/2.2 
      || Math.abs(this.x - target.x) > this.width*5.5 )){
       this.vx = this.maxVel;
       this.ax=0;
     } else if(this.x-this.width*0.75 > target.x-target.width
            && (Math.abs(this.y-target.y) < HEIGHT/2.2 
            || Math.abs(this.x-target.x) > this.width*5.5 )) {
       this.vx = -this.maxVel;
       this.ax=0;
     } else {
       this.vx = 0;
       if(Math.max(target.y, this.y) - 30 <= Math.min(target.y, this.y)) {
         this.vx = this.x<opponent.x?this.maxVel:-this.maxVel;
       }
     }
  }
};