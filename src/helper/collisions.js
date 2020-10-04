export function isCollision(self, other) {
  return(
      self.x+self.width > other.x-other.width
      &&other.x+other.width > self.x-self.width 
      &&self.y >= other.y-other.height
      &&other.y+other.height >= self.y  
    )
}

export function isCollisionFront(self, other) {
  return self.py + self.height > other.y - other.height;
};

export function isCollisionBack(self, other) {
  return self.py - self.height < other.y + other.height;
};