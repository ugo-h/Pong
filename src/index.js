import { attachControls } from './controls/controls';
import { Paddle } from './Game/Paddle';
import Ball from './Game/Ball';
import config from './config';

const canv = document.getElementById('canv');
const { FPS, WIDTH, HEIGHT, PLAYABLE } = config;
const POSITION_BOTTOM = HEIGHT/1.125;
const POSITION_TOP = HEIGHT/6;

canv.height = HEIGHT;
canv.width = WIDTH;
const ctx = canv.getContext('2d');

const ball = new Ball(WIDTH/2, HEIGHT/3, 10);
const playerPaddle = new Paddle(POSITION_BOTTOM, 0.8, 6, { ai: !PLAYABLE })
const aiPaddle = new Paddle(POSITION_TOP, 0.8, 6, { ai: true })

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

}

function loop() {
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
 setTimeout(loop, 1000/FPS);
}

if(PLAYABLE){
  attachControls(playerPaddle)
}

loop();