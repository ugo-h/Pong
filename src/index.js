import { attachControls, attachMobileControls } from './controls/controls';
import { Paddle } from './Game/Paddle';
import Ball from './Game/Ball';
import config from './config';
import isBrowserMobile from './helper/detectmobilebrowser';

const canv = document.getElementById('canv');
const { FPS, WIDTH, HEIGHT, PLAYABLE } = config;
const POSITION_BOTTOM = HEIGHT/1.125;
const POSITION_TOP = HEIGHT/6;

let run = false;

canv.height = HEIGHT;
canv.width = WIDTH;
const ctx = canv.getContext('2d');

const ball = new Ball(WIDTH/2, HEIGHT/3, 10);
const playerPaddle = new Paddle(POSITION_BOTTOM, 8, { isControlledByAi: !PLAYABLE })
const aiPaddle = new Paddle(POSITION_TOP, 7, { isControlledByAi: true })

function initMenu() {
  const menu = document.getElementById('menu');  
  document.addEventListener('keydown', ev => {
    if(ev.code === 'Escape') {
      run = !run;
      menu.classList.toggle('invisible')
    }
  })
  menu.addEventListener('click', ev => {
    if(!ev.target.classList.contains('menu__el')) return;
    if(ev.target.id === 'start') {
      run = true;
      console.log('run')
      ev.currentTarget.classList.add('invisible');
    }
  })
}

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

}

function loop() {
  setTimeout(loop, 1000/FPS);
  if(!run) {
    return;
  }
  clearScreen();
  try{
    ball.draw(ctx);
    ball.update();
    
    playerPaddle.draw(ctx)
    playerPaddle.update(ball, aiPaddle)
    
    aiPaddle.draw(ctx)
    aiPaddle.update(ball, playerPaddle)
    
  } catch(err){
    console.log(err)
    return
  }
};

if(PLAYABLE){
  if(isBrowserMobile()) {
    attachMobileControls(playerPaddle);
  } else {
    attachControls(playerPaddle);
  }
};
if(!isBrowserMobile()) {
  const btns = document.querySelectorAll('button');
  btns.forEach(btn => btn.style.display = 'none')
}


initMenu();
loop();
