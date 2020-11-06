import Shape from '../Graphics/Shape';
import { isCollision, isCollisionBack, isCollisionFront } from '../helper/collisions';
import { paddles } from './Paddle';
import config from '../config';
var { ballVelocity, ballVelocityMin } = config; 

class Ball extends Shape{
  constructor(x, y, radius) {
      super(x, y, radius, radius);
      this.px = this.x;
      this.py = this.y;
      this.vy = ballVelocityMin;
      this.ay = 0.5,
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
      this.handleCollisions(other)
   } else if(isCollisionX(this, other) && hasPotentialForCollisionY(this, other)) {
        for(let i = Math.min(this.py, this.y); i < Math.max(this.y, this.py); i += 4) {
          if(isCollisionY(this, other)) {
            this.handleCollisionY(other);
            return;
          }
        }
    }
  }
  handleCollisions(other) {
      if(isCollisionFront(this, other) || isCollisionBack(this, other)) {
          this.handleCollisionY(other);
      } else {
        this.handleCollisionX(other);
      }
  }
  handleCollisionX(other) {
    this.x = this.px;

    this.vx = -this.calculateAngle(this.x, other.x);
    this.vy = -this.vy;
  };

  handleCollisionY(other) {
    this.y = this.py;
    this.ay = -this.ay;

    this.vx = this.calculateAngle(this.x, other.x);
    this.vy = -this.vy + this.ay;
  };

  calculateAngle(x1, x2) {
    return (x1 - x2) * 0.2;
    // return otherVel? otherVel*(0.1*thisVel): thisVel
  }
};

function isCollisionX(self, other) {
    return self.x+self.width > other.x-other.width
        &&other.x+other.width > self.x-self.width 
}
function isCollisionY(self, other) {
  return self.y+self.height > other.y-other.height
      &&other.y+other.height > self.y-self.height 
}
function hasPotentialForCollisionY(self, other) {
  return(self.y < other.y && self.py > other.y)
      ||(self.y > other.y && self.py < other.y)
}
export default Ball;