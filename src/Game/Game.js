class Game {
    static init(config) {
        const canv = document.getElementById('canv');
        
        this.FPS = config.fps;
        this.height = config.HEIGHT;
        this.width = config.WIDTH;
        this.setupCanvas(canv);
        this.ctx = canv.getContext('2d');
        this.run = false;
        
        this.onCreate();
        this.onUpdate();
    };
    
    setupCanvas(canv) {
        canv.height = this.height;
        canv.width = this.width;
        
    }
    static onCreate() {
        const POSITION_BOTTOM = HEIGHT/1.125;
        const POSITION_TOP = HEIGHT/6;    
    }
    static onUpdate() {

    }
}