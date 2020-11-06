//WIDTH : 750,
//HEIGHT: 400
import isBrowserMobile from './helper/detectmobilebrowser';
const FPS = isBrowserMobile()? 40: 50;
const BALL_SPEED__MIN = 3;
const BALL_SPEED__MAX = 8;
const BALL_ACCELERATION = 0.1;
const PADDLE_VEL = 16;
const SCREEN_SIZE_MOD = isBrowserMobile()? 2: 1;
export default {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    PLAYABLE: true,
    ballVelocity: (60/(FPS*SCREEN_SIZE_MOD))*BALL_SPEED__MAX,
    ballVelocityMin:  (60/(FPS*SCREEN_SIZE_MOD))*BALL_SPEED__MIN,
    ballAcceleration: (60/FPS) *BALL_ACCELERATION,
    paddleVelocity: (60/(FPS*SCREEN_SIZE_MOD))* PADDLE_VEL,
    fps: FPS,
    DEFAULT_COLOR: '#84d07d',
    BG_COLOR: '#3e4943',
    DEBUG_ON: false
}