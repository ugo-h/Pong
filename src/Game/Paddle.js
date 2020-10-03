import Shape from '../Graphics/Shape';
import config from '../config';
const { WIDTH, HEIGHT } = config; 

export const paddles = [];

export class Paddle  extends Shape{
  constructor(y, { velocity }) {
    super(WIDTH/2, y, 75, 10);
    this.ax = 0;
    this.maxA = 0.8;
    this.maxVel = velocity? velocity: 7;
    paddles.push(this)
  };
  
  update() {
    this.checkBoundsX();
    if(this.vx >= this.maxVel || this.vx <= -this.maxVel){
      this.ax = 0;
    }
    this.x += this.vx;
    this.vx += this.ax;
  };
  
  checkBoundsX() {
    if(this.x > WIDTH-this.width) {
      this.x = WIDTH-this.width;
    } else if(this.x < 0 + this.width) {
      this.x = 0 + this.width;
    }
  };
  
  
};