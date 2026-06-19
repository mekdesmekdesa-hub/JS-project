const canvas=document.getElementById("board");
const drawnigPen=canvas.getContext("2d");
//board
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
drawnigPen.lineWidth=20;
const offSet=drawnigPen.lineWidth/2;
drawnigPen.strokeStyle="blue";
const boardWidth=canvas.width-drawnigPen.lineWidth;
const boardHeight=canvas.height-drawnigPen.lineWidth;
drawnigPen.strokeRect(offSet,offSet,boardWidth,boardHeight);
//snake body
drawnigPen.fillStyle="pink";
drawnigPen.fillRect(50,50,20,20);
//snake eye
drawnigPen.fillStyle="black";
drawnigPen.arc(62,58,4,0, Math.PI*2);
drawnigPen.fill();
//movement 
let x=50;
let y=50;
function update(){
    if(x>=boardWidth-20){
        x=50;
    }
    else {
        x=x+1;
    }
}
function draw(){
    drawnigPen.clearRect(0,0,canvas.width,canvas.height);
    drawnigPen.fillStyle="pink";
    drawnigPen.fillRect(x,y,20,20);
}
function move(){
    update();
    draw();
    requestAnimationFrame(move);
}
move();