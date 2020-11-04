import Shape from '../Graphics/Shape';
import { isCollision, isCollisionBack, isCollisionFront } from '../helper/collisions';
import { paddles } from './Paddle';
import config from '../config';
var { ballVelocity, ballAcceleration, ballVelocityMin } = config; 

class Ball extends Shape{
  constructor(x, y, radius) {
      super(x, y, radius, radius);
      this.px = this.x;
      this.py = this.y;
      this.vy = ballVelocityMin;
      this.ay = ballAcceleration,
      this.maxVel = ballVelocity;
  } 

  checkBoundsX(width) {
    if(this.x > width-this.width) {
      this.x = width-this.width;
      this.vx *= -1;
    } else if(this.x < 0 + this.width) {
      this.x = 0 + this.width;
      this.vx *= -1;
    }
  }
  update() {
    this.px = this.x;
    this.py = this.y;
  
    // this.vy += this.ay;
    this.y += this.vy;
    this.x += this.vx;
    
    this.detectAllCollisions();
    this.vx = Math.min(this.vx, this.maxVel);
    this.vy = Math.min(this.vy, this.maxVel)
  } 
  detectAllCollisions() {
    for(const paddle of paddles) {
      this.detectCollision(paddle);
    }
  };

  detectCollision(other) {
    if(isCollision(this, other)) {
      if(isCollisionFront(this, other) || isCollisionBack(this, other)) {
          this.handleCollisionY(other);
      } else {
        this.handleCollisionX(other);
      }
   } 
  }

  handleCollisionX(other) {
    this.x = this.px;

    this.vx = -this.vx*2;
    this.vy = -this.vy;
  };

  handleCollisionY(other) {
    this.y = this.py;

    // this.ay = - this.ay;
    this.vx = other.vx? other.vx*0.5: this.vx;
    this.vy = -this.vy;  
  };
};


export default Ball;