import nipplejs from 'nipplejs';
import config from '../config';

export function attachJoystick(player) {
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

}

export function attachMobileControls(player) {
    var ctrlLeft = document.getElementById('ctrl-left');
    var ctrlRight = document.getElementById('ctrl-right');
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
  }
  
export function attachControls(player) {
      document.addEventListener('keydown', function(ev) {
          if(ev.code === 'KeyA') {
              player.ax = -player.maxA;
          } else if(ev.code === 'KeyD') {
              player.ax = player.maxA;
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
  