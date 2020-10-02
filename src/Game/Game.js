import isBrowserMobile from '../helper/detectmobilebrowser';

export default class Game {
    static init(config) {
        const canv = document.getElementById('canv');

        this.fps = config.fps;
        this.height = config.HEIGHT;
        this.width = config.WIDTH;
        this.ballSpeed = config.BALL_SPEED;
        this.userControllsPaddle = config.PLAYABLE;
        this.setupCanvas(canv);
        this.ctx = canv.getContext('2d');
        this.run = false;
        this.isGameOver = false;
        
        this.initMenu();
        this.onCreate();
        this.attachControls();
        this.loop();
    };
    
    static setupCanvas(canv) {
        canv.height = this.height;
        canv.width = this.width;
    }

    static attachControls() {
        if(this.userControllsPaddle){
            if(isBrowserMobile()) {
              this.mobileControls();
            } else {
              this.controls();
            }
        };
    };
    static initMenu() {
        const menu = document.getElementById('menu');  
        document.addEventListener('keydown', ev => {
          if(ev.code === 'Escape' && !this.isGameOver) {
            this.run = !this.run;
            menu.classList.toggle('invisible')
          }
        })
        menu.addEventListener('click', ev => {
          if(!ev.target.classList.contains('menu__el')) return;
          if(ev.target.id === 'start') {
            this.run = true;
            console.log(this.run)
            ev.currentTarget.classList.add('invisible');
          }
        })
    }

    static loop() {
        setTimeout(() => this.loop(), 1000/this.fps);
        if(!this.run) return
        this.clearScreen();
        this.onUpdate();    
    }

    static clearScreen() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
   
    static mobileControls() {

    }

    static controls() {

    }


    static onCreate() {
        
    }

    static onUpdate() {

    }

}