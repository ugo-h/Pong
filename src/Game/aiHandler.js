function readyToMoveRight() {
    return(
        self.x + self.width*0.75 < target.x + target.width
    && (checkDistanceY(self, target) || checkDistanceX(self, target))
    )
};

function checkDistanceY(self, target) {
    return Math.abs(self.y - target.y) < HEIGHT/2.2;
};

function checkDistanceX(self, target) {
    return Math.abs(self.x - target.x) > self.width*5.5;
};

function readyToMoveLeft() {
    return(
        self.x - self.width*0.75 > target.x - target.width
        && (checkDistanceY(self, target) || checkDistanceX(self, target))
    )
};

function isCloseEnough(target) {
    return Math.max(target.y, self.y) - 30 <= Math.min(target.y, self.y);
};

export default function handleAi(self, target, opponent) {
    if(readyToMoveRight()){
        self.vx = self.maxVel;
        self.ax=0;
    } else if(readyToMoveLeft()) {
        self.vx = -self.maxVel;
        self.ax=0;
    } else {
        self.vx = 0;
        if(isCloseEnough(target)) {
            self.vx = self.x < opponent.x? self.maxVel: -self.maxVel;
        }
    }
};