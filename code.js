let MAX_NUMBER_OF_CIRCLES=800;
let maxRadius=7;
let minRadius=2;
let greaterMaxRadius=40;
let maxSpeed=4;
let colorsArray = ['#F6F792', '#333745', '#77C4D3', '#DAEDE2', '#EA2E49'];
let canvas=document.getElementById("myCan");
let button=document.getElementById("myButton");
let c=canvas.getContext("2d");
let myCircles=[];
let myLet;

let mouse={
  x: undefined,
  y: undefined
}

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius= radius;
    this.color = colorsArray[Math.floor(Math.random()*colorsArray.length)];
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    c.fillStyle=this.color;
    c.fill();
  }

  update() {
    if((this.x+this.radius)>window.innerWidth || (this.x-this.radius)<0)
      this.dx=-this.dx;
    if((this.y+this.radius)>window.innerHeight || (this.y-this.radius)<0)
      this.dy=-this.dy;

    this.x+=this.dx;
    this.y+=this.dy;

    if(mouse.x-this.x < 50 && mouse.x-this.x > -50
      && mouse.y-this.y < 50 && mouse.y-this.y > -50){
        if(this.radius<greaterMaxRadius) this.radius++;
      }else {
        if(this.radius>this.minRadius)this.radius--;
      }

    this.draw();
  }
}

window.addEventListener("resize", function() {
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  c.clearRect(0,0,window.innerWidth, window.innerHeight);
  myCircles=[];
  makeCircles(MAX_NUMBER_OF_CIRCLES);
});

window.addEventListener("mousemove", function(e) {
  mouse.x=e.x;
  mouse.y=e.y;
});

function makeCircles(numberOfCircles) {
  let x, y, dx, dy, radius;
  for(let i=0; i<numberOfCircles; i++){
    radius= Math.floor(Math.random()*(maxRadius-minRadius)+minRadius);
    x=Math.floor(Math.random()*(window.innerWidth - radius*2)+radius);
    y=Math.floor(Math.random()*(window.innerHeight - radius*2)+radius);
    dx=(Math.random()-0.5)*maxSpeed;
    dy=(Math.random()-0.5)*maxSpeed;
    if(dx<1 && dx>-1) dx+=1;
    if(dy<1 && dy>-1) dy+=1;
    myCircles.push(new Circle(x, y, dx, dy, radius));
  }
  if(myCircles.length>=MAX_NUMBER_OF_CIRCLES)
    clearInterval(myLet);
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,window.innerWidth, window.innerHeight);
  for(let i=0; i<myCircles.length; i++)
    myCircles[i].update();
}

function stopCircles() {
  for(let i=0; i<myCircles.length; i++){
    myCircles[i].dx=0;
    myCircles[i].dy=0;
  }
}

function moveCircles() {
  for(let i=0; i<myCircles.length; i++){
    myCircles[i].dx=Math.floor((Math.random()-0.5)*5);
    myCircles[i].dy=Math.floor((Math.random()-0.5)*5);
    if(myCircles[i].dx===0) myCircles[i].dx+=1;
    if(myCircles[i].dy===0) myCircles[i].dy+=1;
  }
}

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

window.onload=start;
animate();

function start() {
  myLet=setInterval(makeCircles, 100, 20);
}

// function start() {
//   moveCircles();
//   button.innerHTML="Stop this madness!";
//   myLet=setInterval(makeCircles, 100, 1);
//   button.onclick=stop;
// }
//
// function stop() {
//   clearInterval(myLet);
//   stopCircles();
//   button.innerHTML="Continue the madness";
//   button.onclick=start;
// }
