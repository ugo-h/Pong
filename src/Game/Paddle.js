import Shape from '../Graphics/Shape';

export const paddles = [];

export class Paddle  extends Shape{
  constructor(x, y, { velocity, size }) {
    super(x, y, size, size/7);
    this.ax = 0;
    this.maxA = 0.8;
    this.maxVel = velocity? velocity: 7;
    paddles.push(this)
  };
  
  update() {
    if(this.vx >= this.maxVel || this.vx <= -this.maxVel){
      this.ax = 0;
    }
    this.x += this.vx;
    this.vx += this.ax;
  };
  
  checkBoundsX(width) {
    if(this.x > width-this.width) {
      this.x = width-this.width;
    } else if(this.x < 0 + this.width) {
      this.x = 0 + this.width;
    }
  };
  
  
};