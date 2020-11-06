import nipplejs from 'nipplejs';
import config from '../config';
import { createMobileControls } from './createMobileControls';

export function attachJoystick(player, pauseCallback) {
  const options = {
    zone: document.getElementById('joystick'),
    mode: 'static',
    restJoystick: true,
    color: '#666',
    restOpacity: 1,
    position: {top: '50%', left: '50%'},
    lockX: true,
    threshold: 1
  }
  const manager = nipplejs.create(options);
  const joystic = manager[0];
  manager.on('move plain', (ev) => {
    const ax = joystic.frontPosition.x;
    player.vx = ax*config.ballAcceleration;
  })
  manager.on('end', () => {
    player.ax = 0;
    player.vx = 0;
  })

  const ctrlStart = document.getElementById('btn-start');
  ctrlStart.addEventListener('touchend', function() {
    pauseCallback()
  })
}

export function attachMobileControls(player, pauseCallback) {
    const { ctrlLeft, ctrlRight } = createMobileControls();
    const ctrlStart = document.getElementById('btn-start');

    ctrlLeft.addEventListener('touchstart', function(ev) {
      ev.preventDefault();
      player.ax = -player.maxA;
    })
    ctrlLeft.addEventListener('touchend', function(ev) {
      player.vx = 0;
      player.ax = 0;
    })
    ctrlRight.addEventListener('touchstart', function(ev) {
      ev.preventDefault();  
      player.ax = player.maxA;
    })
    ctrlRight.addEventListener('touchend', function(ev) {
      player.vx = 0;
      player.ax = 0;
    })
    ctrlStart.addEventListener('touchend', function() {
      pauseCallback()
    })
  }
  
export function attachControls(player, pauseCallback) {
      document.addEventListener('keydown', function(ev) {
          if(ev.code === 'KeyA') {
              player.ax = -player.maxA;
          } else if(ev.code === 'KeyD') {
              player.ax = player.maxA;
          } else if(ev.code === 'Escape') {
              pauseCallback();
          }
        })
        document.addEventListener('keyup', function(ev) {
          if(ev.code === 'KeyA') {
              player.vx = 0;
              player.ax = 0;
              
          } else if(ev.code === 'KeyD') {
              player.vx = 0;
              player.ax = 0;
             
          }

        })
  }
  