import config from './config';
import Game from './Game/Game';
import { Paddle } from './Game/Paddle';
import Ball from './Game/Ball';
import { attachControls, attachJoystick } from './controls/controls';
import { scoreLeftHandler, scoreRightHandler, setScoresToZero } from './Game/utils/scoreHandler';
import Ai from './Game/utils/aiHandler';

class Pong extends Game{
  static onCreate() {
    this.initGameOverMenu();

    const POSITION_BOTTOM = this.height/1.125;
    const POSITION_TOP = this.height/6;    

    const playerProperties = { velocity: config.paddleVelocity, size: this.width*0.12 };
    const compProperties =  { velocity: config.paddleVelocity/2.5, isControlledByAi: true, size: this.width*0.12 };
    Ai.init(this.width, this.height);

    this.ball = new Ball(this.width/2, this.height/3, this.width/60);
    this.playerPaddle = new Paddle(this.width/2,  POSITION_BOTTOM, playerProperties);
    this.aiPaddle = new Paddle(this.width/2, POSITION_TOP, compProperties);

    this.scoreLeft = 0;
    this.scoreRight = 0;

    this.objective = 5;
  };

  static onUpdate() {
    this.checkForGameover();
    this.scoreCheck(this.ball);
    Ai.connectAi(this.aiPaddle, this.ball, this.playerPaddle);

    this.ball.draw(this.ctx);
    this.ball.update();
    this.ball.checkBoundsX(this.width);

    this.playerPaddle.draw(this.ctx);
    this.playerPaddle.update();
    this.playerPaddle.checkBoundsX(this.width);

    this.aiPaddle.draw(this.ctx);
    this.aiPaddle.update();
    this.aiPaddle.checkBoundsX(this.width);
  };

  static checkForGameover() {
    if(this.scoreLeft >= this.objective) {
      this.gameOver({title: 'YOU WON!'});
    } else if(this.scoreRight >= this.objective) {
      this.gameOver({title: 'GAME OVER!'});
    }
  };

  static controls() {
    console.log('controls attached')
    attachControls(this.playerPaddle);
  };
  
  static mobileControls() {
    console.log(' mobile controls attached')
    attachJoystick(this.playerPaddle);
  };


  static scoreCheck(obj){
    if(obj.y > this.height) {
        obj.x = this.width/2;
        obj.y = this.height/4;
        obj.vy = config.ballVelocity;

        obj.vx = 0;
        this.scoreRight = scoreRightHandler()
        
    } else if(obj.y < 0-obj.height*2 ){
        obj.x = this.width/2;
        obj.y = this.height/1.2;
        obj.vy = -config.ballVelocity;

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
      this.ball.vy = 1;
      this.playerPaddle.x = this.width/2;
      this.aiPaddle.x = this.width/2;
      this.isGameOver = false;
      this.run = true;
    }
};


Pong.init(config);