import Shape from '../Graphics/Shape';

export const paddles = [];

export class Paddle  extends Shape{
  constructor(x, y, { velocity, size }) {
    super(x, y, size, size/7);
    this.ax = 0;
    this.maxA = 1.6;
    this.maxVel = velocity? velocity: 14;
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
  returnToInitialPosition() {
    this.x = this.intialPosition.x;
  };
  
  
};