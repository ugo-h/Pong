import Shape from './Graphics/Shape'

var FPS = 60;
var canv = document.getElementById('canv');
var WIDTH = 750;
var HEIGHT = 400;
var SHOW_CENTERS = false;
var BALL_SPEED = 3;
var solidShapes = [];

canv.height = HEIGHT;
canv.width = WIDTH;
var ctx = canv.getContext('2d');


function Ball(x, y, width, height, color) {
    Shape.call(this, x, y, width, height, color, false);
    this.maxVel = 10;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.update = function() {
    this.y+=this.vy;
    this.x+=this.vx;
    checkBoundsX(this);
    checkBoundsY(this)
    for(var i = 0; i < solidShapes.length; i++) {
      var shape = solidShapes[i];
 
      if(isCollision(this, shape)) {   
       shape.color = 'red';
       var energy = (Math.abs(this.vx))
       this.x-=this.vx;
       this.y-=this.vy;
        
        if(this.x-this.width >= shape.x + shape.width
        || this.x+this.width <= shape.x - shape.width){
          this.vx = -this.vx;
          this.vy = this.vy;
         // this.vy = this.vy + shape.vy*0.5;
          //console.log('horizontal')
    
        } else {
          this.vx = shape.vx? shape.vx*0.5:this.vx;
          this.vy = -this.vy;
        }
      } else {
        shape.color = shape.dColor;
        
      }
      this.vx = Math.min(this.vx, this.maxVel);
      this.vy = Math.min(this.vy, this.maxVel)
    }
}
function SolidShape(x, y, width, height, color, isStatic) {
  Shape.call(this, x, y, width, height, color, isStatic);
  solidShapes.push(this);
}

SolidShape.prototype = Object.create(Shape.prototype)

function Paddle(y, maxA, maxVel, isNp) {
  this.x = WIDTH/2
  this.height = 10;
  this.width = 75;
  SolidShape.call(this, this.x, y, this.width, this.height, 'white', false);
  this.ax = 0;
  this.maxA = maxA;
  this.maxVel = maxVel;
  this.isNp = !!isNp;
}
Paddle.prototype = Object.create(SolidShape.prototype);
Paddle.prototype.update = function(target) {
  checkBoundsX(this);
  if(this.vx >= this.maxVel || this.vx <= -this.maxVel){
    this.ax = 0;
  }
  this.x += this.vx;
  this.vx += this.ax;
  if(this.isNp) {
    if(this.x+this.width*0.75 < target.x+target.width
     && Math.abs(this.y-target.y) < HEIGHT/2.2){
      this.vx = this.maxVel;
      this.ax=0;
    } else if(this.x-this.width*0.75 > target.x-target.width
           && Math.abs(this.y-target.y) < HEIGHT/2.2) {
      this.vx = -this.maxVel;
      this.ax=0;
    } else {
    // this.ax = -this.ax;
      this.vx = 0;
      if(Math.max(target.y, this.y) - 30 <= Math.min(target.y, this.y)) {
        this.vx = Math.random()>0.5?this.maxVel:-this.maxVel;
      }
     // this.ax = -this.ax*0.5
      
    }
  }
}

function checkBoundsX(obj) {
  if(obj.x > WIDTH-obj.width) {
    obj.x = WIDTH-obj.width;
  } else if(obj.x < 0 + obj.width) {
    obj.x = 0 + obj.width;
  }
}

function checkBoundsY(obj){
  if(obj.y > HEIGHT || obj.y < 0-obj.height*2 ) {
    obj.x = WIDTH/2;
    obj.y = HEIGHT/4;
    obj.vy=BALL_SPEED;
    obj.vx=0;
    
  } 
}



function isCollision(self, other) {
  return(
    self.x+self.width > other.x-other.width
    &&other.x+other.width > self.x-self.width 
    &&self.y+self.height > other.y-other.height
    &&other.y+other.height > self.y-self.height
   
    )
}

function inRange(val, min, max) {
  return val > min && val < max;
}




var ball = new Ball(WIDTH/2, HEIGHT/3, 10, 10, 'white', false);
var playerPaddle = new Paddle( HEIGHT/1.125, 0.6, 10)
var aiPaddle = new Paddle( HEIGHT/6, 0.8, 6, true)
//var aiPaddle2 = new Paddle( HEIGHT/1.125, 0.8, 6, true)

var wall1 = new SolidShape(0, HEIGHT/2, 20, HEIGHT, 'gray', true)
var wall2 = new SolidShape(WIDTH, HEIGHT/2, 20, HEIGHT, 'gray', true)

console.log(solidShapes);

function attachControls(player) {
  var ctrlLeft = document.getElementById('ctrl-left');
  var ctrlRight = document.getElementById('ctrl-right');
  
  ctrlLeft.addEventListener('touchstart', function(ev) {
    ev.preventDefault();
    player.ax = -player.maxA;
    //ev.target.style.background = '#edcfa9';
  })
  ctrlLeft.addEventListener('touchend', function(ev) {
    player.vx = 0;
    player.ax = 0;
 //   ev.target.style.background = 'grey'
  })
  ctrlRight.addEventListener('touchstart', function(ev) {
    ev.preventDefault();  
    player.ax = player.maxA;
   // ev.target.style.background = '#edcfa9';
  })
  ctrlRight.addEventListener('touchend', function(ev) {
    player.vx = 0;
    player.ax = 0;
  //  ev.target.style.background = 'grey';
  })
}
function loop() {
  setTimeout(loop, 1000/FPS);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  try{
  ball.update();
  ball.draw(ctx);
  
  playerPaddle.draw(ctx)
  playerPaddle.update()
  
  aiPaddle.update(ball)
  aiPaddle.draw(ctx)
  
 // aiPaddle2.update(ball)
 // aiPaddle2.draw(ctx)
 
  wall1.draw(ctx)
  wall2.draw(ctx)
 } catch(err){
   return
 }
}

attachControls(playerPaddle)
loop();