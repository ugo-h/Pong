import config from "../config";

const { WIDTH } = config;

export function checkBoundsX(obj) {
    if(obj.x > WIDTH-obj.width) {
      obj.x = WIDTH-obj.width;
    } else if(obj.x < 0 + obj.width) {
      obj.x = 0 + obj.width;
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