//variables
let numberOfBalls = 500;
let minRadius=8;
let maxRadius=25;
let friction = 0.8;
let gravity = 1;
let canvas = document.getElementById('myCanvas');
let c = canvas.getContext('2d');
let ballsArray=[];
let colorsArray=['#324D5C', '#14B278', '#F0CA4D', '#E37B40', '#ED3752'];

//objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=color;
  }

  draw(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }

  update(){
    if(this.y+this.radius+this.dy>canvas.height){
      this.dy=-this.dy * friction;
    }else{
      this.dy+=gravity;
    }

    if(this.x+this.radius+this.dx>canvas.width || this.x-this.radius<0){
      this.dx=-this.dx;
    }
    this.y+=this.dy;
    this.x+=this.dx;
    this.draw();
  }

}

//functions
function randomIntFromRange(a, b) {
  return Math.floor(Math.random() * (b-a)) + a;
}

function randomElementOfArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function areBallsDown() {
  for (var i = 0; i < ballsArray.length; i++) {
    if((ballsArray[i].y+ballsArray[i].radius+ballsArray[i].dy) < canvas.height) return false;
  }
  return true;
}

function init() {
  ballsArray=[];
  let x, y, dx, dy, radius, color;
  for (let i = 0; i < numberOfBalls; i++) {
    radius = randomIntFromRange(minRadius, maxRadius);
    x=randomIntFromRange(radius, (canvas.width-radius));
    y=randomIntFromRange(0, (canvas.height-radius));
    dx=randomIntFromRange(-5, 5);
    dy=randomIntFromRange(0, 4);
    color=randomElementOfArray(colorsArray);
    ballsArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width, canvas.height);
  for (let i = 0; i < ballsArray.length; i++) {
    ballsArray[i].update();
  }
  if(areBallsDown()){
    c.fillStyle='black';
    c.font='36px Arial';
    c.fillText("Click to see it again", (canvas.width)/9, (canvas.height*3)/4);
  }
}
//script
window.onload=function() {
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  init();
  animate();
};

//event listeners
addEventListener("resize", function() {
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  init();
});

addEventListener("click", init);
