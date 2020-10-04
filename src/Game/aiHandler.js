export default class Ai {
    static init(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    static connectAi(self, target, opponent) {
        if(this.readyToMoveRight(self, target)){
            self.vx = self.maxVel;
            self.ax=0;
        } else if(this.readyToMoveLeft(self, target)) {
            self.vx = -self.maxVel;
            self.ax=0;
        } else {
            self.vx = 0;
            if(this.isCloseEnough(self, target)) {
                self.vx = self.x < opponent.x? self.maxVel: -self.maxVel;
            }
        }
    };

    static readyToMoveRight(self, target) {
        return(
            self.x + self.width*0.75 < target.x + target.width
        && (this.checkDistanceY(self, target) || this.checkDistanceX(self, target))
        )
    };

    static checkDistanceY(self, target) {
        return Math.abs(self.y - target.y) < this.screenHeight/2.2;
    };

    static checkDistanceX(self, target) {
        return Math.abs(self.x - target.x) > self.width*5.5;
    };

    static readyToMoveLeft(self, target) {
        return(
            self.x - self.width*0.75 > target.x - target.width
            && (this.checkDistanceY(self, target) || this.checkDistanceX(self, target))
        )
    };

    static isCloseEnough(self, target) {
        return Math.max(target.y, self.y) - 30 <= Math.min(target.y, self.y);
    };
}