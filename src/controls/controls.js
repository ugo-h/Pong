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
  