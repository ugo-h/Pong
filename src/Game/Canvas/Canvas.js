import config from "../../config";

class Singleton {
    constructor() {
        if(Singleton._instance) {
            return Singleton._instance
        } else {
            Singleton._instance = this;
        }
    }
}
class Screen extends Singleton {
    constructor() {
        super();
        this.canvas = document.getElementById('canv');
        this.ctx = this.canvas.getContext('2d');
        this.screenWidth = this._getWidth();
        this.screenHeight = this._getHeight();
        this._setupScreenSize(this.canvas, this.screenWidth, this.screenHeight);
    };
    clear() {
        this.ctx.fillStyle = config.BG_COLOR;
        this.ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    };

    getCanvas() {
        return this.canvas;
    };

    getContext() {
        return this.ctx;
    };
    shapeOutOfBorderY(shape) {
        if(!shape instanceof Shape) throw new TypeError(`Method [isShapeOutOfScreen] expected to get an instance of class Shape as an argument.\nGot ${typeof shape} instead.`);
        if(shape.y > this.height) return 'top';
        if(ball.y < 0 - ball.height*2 ) return 'bottom';
    }
    _setupScreenSize(canv, width, height) {
        canv.width = width;
        canv.height = height;
    };

    _getHeight() {
        let height = window.visualViewport.height;
        const width = window.visualViewport.width;
        if(width < height) {
          height*=0.7;
        }
        return height;
    };

      _getWidth() {
        let height = window.visualViewport.height;
        let width = window.visualViewport.width;
        if(width > height) {
          height*=0.9;
          return height
        }
        return height*0.7*0.9;
    };
}

export default new Screen();