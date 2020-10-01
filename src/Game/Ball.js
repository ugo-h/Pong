import Shape from '../Graphics/Shape';
import { isCollision, checkBoundsY, isCollisionX, isCollisionY } from '../helper/physicsHelper';
import {paddles} from './Paddle';
import config from '../config';
var { WIDTH, BALL_SPEED } = config; 

function Ball(x, y, radius) {
    Shape.call(this, x, y, radius, radius);
    this.vy = BALL_SPEED;
    this.maxVel = 10;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.checkBoundsX = function() {
  if(this.x > WIDTH-this.width) {
    this.x = WIDTH-this.width;
    this.vx *= -1;
  } else if(this.x < 0 + this.width) {
    this.x = 0 + this.width;
    this.vx *= -1;
  }
}
Ball.prototype.update = function() {
    this.y += this.vy;
    this.x += this.vx;
    this.checkBoundsX();
    checkBoundsY(this)
    for(var i = 0; i < paddles.length; i++) {
      var paddle = paddles[i];
 
      if(isCollision(this, paddle)) {   
        paddle.color = 'red';
        if(isCollisionX) {
          this.vy = paddle.vy? paddle.vy*0.5:this.vy;
          this.vx = -this.vx;
        } 
        if(isCollisionY) {
          this.vx = paddle.vx? paddle.vx*0.5:this.vx;
          this.vy = -this.vy;
        }
        this.x -= this.vx;
        this.y -= this.vy;
        
        
      } else {
        paddle.color = paddle.dColor;
      }
      this.vx = Math.min(this.vx, this.maxVel);
      this.vy = Math.min(this.vy, this.maxVel)
    }
}

export default Ball;