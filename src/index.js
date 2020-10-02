import config from './config';
import Game from './Game/Game';
import { Paddle } from './Game/Paddle';
import Ball from './Game/Ball';
import { attachControls, attachMobileControls } from './controls/controls';
import { scoreLeftHandler, scoreRightHandler, setScoresToZero } from './Game/scoreHandler';

class Pong extends Game{
  static onCreate() {
    this.initGameOverMenu();

    const POSITION_BOTTOM = this.height/1.125;
    const POSITION_TOP = this.height/6;    

    this.ball = new Ball(this.width/2, this.height/3, 10);
    this.playerPaddle = new Paddle(POSITION_BOTTOM, 8, { isControlledByAi: !this.userControllsPaddle });
    this.aiPaddle = new Paddle(POSITION_TOP, 7, { isControlledByAi: true });

    this.scoreLeft = 0;
    this.scoreRight = 0;

    this.objective = 5;
  };

  static onUpdate() {
    this.ball.draw(this.ctx);
    this.ball.update();
    this.scoreCheck(this.ball);
    if(this.scoreLeft >= this.objective) {
      this.gameOver({title: 'YOU WON!'});
    } else if(this.scoreRight >= this.objective) {
      this.gameOver({title: 'GAME OVER!'});
    }
    this.playerPaddle.draw(this.ctx);
    this.playerPaddle.update(this.ball, this.aiPaddle);
    
    this.aiPaddle.draw(this.ctx);
    this.aiPaddle.update(this.ball, this.playerPaddle);
  }
  static hideMobileCOntrols() {    
    if(!isBrowserMobile()) {
        const btns = document.querySelectorAll('button');
        btns.forEach(btn => btn.style.display = 'none')
    }  
  }
  static controls() {
    attachControls(this.playerPaddle)

  }

  static mobileControls() {
    attachMobileControls(this.playerPaddle);
  }

  static scoreCheck(obj){
    if(obj.y > this.height) {
        obj.x = this.width/2;
        obj.y = this.height/4;
        obj.vy = this.ballSpeed;
        obj.vx = 0;
        this.scoreRight = scoreRightHandler()
        
      } else if(obj.y < 0-obj.height*2 ){
        obj.x = this.width/2;
        obj.y = this.height/1.2;
        obj.vy =- this.ballSpeed;
        obj.vx = 0;
        this.scoreLeft = scoreLeftHandler();
      }
    };

    static gameOver(msg) {
      this.run = false;
      this.isGameOver = true;
      this.openGameOverMenu(msg);
    };

    static openGameOverMenu(msg) {
      const menu = document.getElementById('menu-gameover');
      const title = menu.querySelector('.menu__title');
      title.textContent = msg.title;

      menu.classList.remove('invisible')
    };

    static initGameOverMenu() {
      document.getElementById('menu-gameover').addEventListener('click', ev => {
        console.log(ev.target.classList.contains('menu__el'));
        if(!ev.target.classList.contains('menu__el')) return;
        ev.currentTarget.classList.add('invisible');
        this.restart();
      });
    };
    static restart() {
      setScoresToZero();
      this.scoreLeft = 0;
      this.scoreRight = 0;
      this.playerPaddle.x = this.width/2;
      this.aiPaddle.x = this.width/2;
      this.isGameOver = false;
      this.run = true;
    }
}


Pong.init(config);