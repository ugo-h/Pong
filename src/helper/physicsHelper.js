import config from "../config";
import { scoreLeftHandler, scoreRightHandler } from './scoreHandler'

const { WIDTH, HEIGHT, BALL_SPEED } = config;

export function checkBoundsX(obj) {
    if(obj.x > WIDTH-obj.width) {
      obj.x = WIDTH-obj.width;
    } else if(obj.x < 0 + obj.width) {
      obj.x = 0 + obj.width;
    }
  }
  
export function checkBoundsY(obj){
if(obj.y > HEIGHT ) {
    obj.x = WIDTH/2;
    obj.y = HEIGHT/4;
    obj.vy=BALL_SPEED;
    obj.vx=0;
    scoreRightHandler()
    
  } else if(obj.y < 0-obj.height*2 ){
    obj.x = WIDTH/2;
    obj.y = HEIGHT/1.2;
    obj.vy=-BALL_SPEED;
    obj.vx=0;
    scoreLeftHandler();
  }
}



export function isCollision(self, other) {
  return(
      self.x+self.width > other.x-other.width
      &&other.x+other.width > self.x-self.width 
      &&self.y >= other.y-other.height
      &&other.y+other.height >= self.y  
    )
}
export function isCollisionX(self, other) {
  return(
      self.x+self.width > other.x-other.width
      &&other.x+other.width > self.x-self.width 
    )
}

export function isCollisionY(self, other) {
  return(
    self.y >= other.y-other.height
    &&other.y+other.height >= self.y  
    )
}

export function inRange(val, min, max) {
return val > min && val < max;
}