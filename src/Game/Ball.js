import Shape from '../Graphics/Shape';
import { isCollision, checkBoundsY, isCollisionX, isCollisionY } from '../helper/physicsHelper';
import {paddles} from './Paddle';
import config from '../config';
var { WIDTH, BALL_SPEED } = config; 

class Ball extends Shape{
  constructor(x, y, radius) {
      super(x, y, radius, radius);
      this.px = this.x;
      this.py = this.y;
      this.vy = BALL_SPEED;
      this.ay = 0.01;
      this.maxVel = 5;
  } 

  checkBoundsX() {
    if(this.x > WIDTH-this.width) {
      this.x = WIDTH-this.width;
      this.vx *= -1;
    } else if(this.x < 0 + this.width) {
      this.x = 0 + this.width;
      this.vx *= -1;
    }
  }
  update() {
    this.px = this.x;
    this.py = this.y;
  
    this.vy += this.ay;
    this.y += this.vy;
    this.x += this.vx;
    
    this.checkBoundsX();
    this.vx = Math.min(this.vx, this.maxVel);
    this.vy = Math.min(this.vy, this.maxVel)
    this.detectAllCollisions();
  } 
  detectAllCollisions() {
    for(const paddle of paddles) {
      this.detectCollision(paddle);
    }
  };

  detectCollision(other) {
    if(isCollision(this, other)) {
      if(this.isCollisionFront(other) || this.isCollisionBack(other)) {
          this.handleCollisionY(other);
      } else {
        this.handleCollisionX(other);
      }
  } 
  }

  isCollisionFront(other) {
    return this.py + this.height > other.y - other.height;
  };

  isCollisionBack(other) {
    return this.py - this.height < other.y + other.height;
  };

  handleCollisionX(other) {
    this.x = this.px;

    this.vx = -this.vx*2;
    this.vy = -this.vy;
  };

  handleCollisionY(other) {
    this.y = this.py;

    this.ay = - this.ay;
    this.vx = other.vx? other.vx*0.5: this.vx;
    this.vy = -this.vy;  
  };
};


export default Ball;