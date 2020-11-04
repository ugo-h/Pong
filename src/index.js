import config from './config';
import Game from './Game/Game';
import { Paddle } from './Game/Paddle';
import Ball from './Game/Ball';
import { attachControls, attachJoystick } from './controls/controls';
import { scoreLeftHandler, scoreRightHandler, setScoresToZero } from './Game/utils/scoreHandler';
import Ai from './Game/utils/aiHandler';
import { createGameOverMenu } from './Game/Menus/Menus';

class Pong extends Game{
  static onCreate() {
    this.restart = this.restart.bind(this);

    const POSITION_BOTTOM = this.height/1.125;
    const POSITION_TOP = this.height/6;    

    const playerProperties = { velocity: config.paddleVelocity, size: this.width*0.12 };
    const compProperties =  { velocity: config.paddleVelocity/2.5, isControlledByAi: true, size: this.width*0.12 };
    Ai.init(this.width, this.height);
    this.ball = new Ball(this.width/2, this.height/3, this.width/60);
    this.playerPaddle = new Paddle(this.width/2,  POSITION_BOTTOM, playerProperties);
    this.aiPaddle = new Paddle(this.width/2, POSITION_TOP, compProperties);

    this.shapes = [
        this.ball,
        this.playerPaddle,
        this.aiPaddle
    ]

    this.scoreLeft = 0;
    this.scoreRight = 0;

    this.objective = 5;
  };

  static onUpdate() {
    this.checkForGameover();
    this.scoreCheck(this.ball);
    Ai.connectAi(this.aiPaddle, this.ball, this.playerPaddle);

    this.shapes.forEach(shape => {
      shape.draw(this.ctx)
      shape.update();
      shape.checkBoundsX(this.width);
    })
  };

  static checkForGameover() {
    if(this.scoreLeft >= this.objective) {
      this.gameOverHandler('YOU WON!');
    } else if(this.scoreRight >= this.objective) {
      this.gameOverHandler('GAME OVER!');
    }
  };
  static attachControls() {
    attachControls(this.playerPaddle, this.pauseHandler);
    // attachJoystick(this.playerPaddle);
  }

  static scoreCheck(ball){
    if(ball.y > this.height) {
        ball.x = this.width/2;
        ball.y = this.height/4;
        ball.vy = config.ballVelocity;

        ball.vx = 0;
        this.scoreRight = scoreRightHandler()
        
    } else if(ball.y < 0 - ball.height*2 ){
        ball.x = this.width/2;
        ball.y = this.height/1.2;
        ball.vy = -config.ballVelocity;

        ball.vx = 0;
        this.scoreLeft = scoreLeftHandler();
      }
    };
    static gameOverHandler(msg) {
      this.setGameToOver();
      createGameOverMenu(msg, this.restart);
    };

    static restart() {
      setScoresToZero();
      this.scoreLeft = 0;
      this.scoreRight = 0;
      this.ball.vy = 1;
      this.playerPaddle.x = this.width/2;
      this.aiPaddle.x = this.width/2;
      this.startGame();
    }
};


Pong.init(config);