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
let x=10;
let y=50;
//connecting keyboard keys to the JS
let direction="RIGHT";
document.addEventListener("keydown",handleKeys);
function handleKeys(event){
    alert("wow")
    if (event.key=="ArrowUp"){
        direction="UP";
    }
    else if(event.key=="ArrowDown"){
        direction="DOWN";
    }
    else if(event.key=="ArrowLeft"){
        direction="LEFT";
    }
    else if(event.key=="ArrowRight"){
        direction="RIGHT";
    }
}
function update(){
    if (direction==="LEFT"){
        x=x-20;
    }
    else if(direction==="RIGHT"){
        x=x+20;
    }
    else if(direction==="UP"){
        y=y-20;
    }
    else if(direction==="DOWN"){
        y=y+20;
    }
    if(x>=boardWidth-20){//wall collision
        x=x;
    }
    else {
        x=x+1;
    }
}
function draw(){
    drawnigPen.clearRect(0,0,canvas.width,canvas.height);
    drawnigPen.fillStyle="pink";
    drawnigPen.fillRect(x,y,20,20);
    drawnigPen.lineWidth=20;
    const offSet=drawnigPen.lineWidth/2;
    drawnigPen.strokeStyle="blue";
    const boardWidth=canvas.width-drawnigPen.lineWidth;
    const boardHeight=canvas.height-drawnigPen.lineWidth;
    +drawnigPen.strokeRect(offSet,offSet,boardWidth,boardHeight);
}
function move(){
    update();
    draw();
    requestAnimationFrame(move);
}
move()
setInterval(update,200);