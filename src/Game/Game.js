import screen  from './Canvas/Canvas';

export default class Game {
    static init(config) {
        this.pauseHandler = this.pauseHandler.bind(this);

        const canvas = screen.getCanvas()
        this.ctx = screen.getContext();

        this.width = canvas.width;
        this.height = canvas.height;

        this.fps = config.fps;
        this.run = true;
        this.isGameOver = false;

        this.onCreate();
    };
 
    static _loop() {
        if(this.gameover){
          return
          };
        setTimeout(() => this._loop(), 1000/this.fps);

        if(!this.run) return;
        screen.clear();
        
        this.onUpdate();    
    }
    
    static startGame() {
      this.gameover = false;
      this.run = true;
      this._loop();
    }

    static pauseHandler() {
      if(this.gameover) return;

      this.ctx.font = "30px Arial";
      this.ctx.fillStyle = '#84d07d';
      this.ctx.fillText('Pause', this.width/2 -40, this.height/2);

      this.run = !this.run;
    }
    static setGameToOver() {
      this.gameover = true;
    }

    static attachControls() {};
      
    static onCreate() {};

    static onUpdate() {};
}