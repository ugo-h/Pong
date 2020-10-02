import config from './config';
import Game from './Game/Game';
import { Paddle } from './Game/Paddle';
import Ball from './Game/Ball';
import { attachControls, attachMobileControls } from './controls/controls';

class Pong extends Game{
  static onCreate() {
    const POSITION_BOTTOM = this.height/1.125;
    const POSITION_TOP = this.height/6;    

    this.ball = new Ball(this.width/2, this.height/3, 10);
    this.playerPaddle = new Paddle(POSITION_BOTTOM, 8, { isControlledByAi: !this.userControllsPaddle })
    this.aiPaddle = new Paddle(POSITION_TOP, 7, { isControlledByAi: true })
  }

  static onUpdate() {
    this.ball.draw(this.ctx);
    this.ball.update();
    
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
}

Pong.init(config);