import isBrowserMobile from '../helper/detectmobilebrowser';

export default class Game {
    static init(config) {
      const canv = document.getElementById('canv');
      this.canv = canv;
      this.fps = config.fps;
      this.width = this.getWidth();
      this.height = this.getHeight();
      this.setupCanvas(this.canv)

      this.ctx = canv.getContext('2d');
      this.run = false;
      this.isGameOver = false;
      this.initMenu();
      this.onCreate();
      this.attachControls();
      this.loop();
    };
    
    static setupCanvas(canv) {
      canv.width = this.width;
      canv.height = this.height;
    }

    static attachControls() {
        if(this.userControllsPaddle){
          this.mobileControls();
          if(!isBrowserMobile()) {
            this.controls();                
          }
        };
    };
    static initMenu() {
        const menu = document.getElementById('menu');  
        const startBtn = document.getElementById('btn-start');
        startBtn.addEventListener('touchstart', () => {
          this.run = !this.run;
          menu.classList.toggle('invisible')
        })
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
        this.ctx.fillStyle = '#3e4943';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    static getHeight() {
      let height = window.visualViewport.height;
      const width = window.visualViewport.width;
      if(width < height) {
        height*=0.7;
      }
      return height;
    }
    
    static getWidth() {
      let height = window.visualViewport.height;
      let width = window.visualViewport.width;
      if(width > height) {
        height*=0.9;
        return height
      }
      return height*0.7*0.9;
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