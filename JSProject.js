const canvas=document.getElementById("board");
const drawnigPen=canvas.getContext("2d");
//canvas
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
drawnigPen.lineWidth=20;
const offSet=drawnigPen.lineWidth/2;
//board
let board={
    width:canvas.width-drawnigPen.lineWidth,
    height:canvas.height-drawnigPen.lineWidth,
}
//board border
let boardBorder={
    style:drawnigPen.strokeStyle="blue",
    size:drawnigPen.strokeRect(offSet,offSet,board.width,board.height)
}


//snake body
let snakeBody={
    styel:drawnigPen.fillStyle="pink",
    size:drawnigPen.fillRect(50,50,20,20),

}
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
let gameLoop=setInterval(update,200);
function gameOver(){
    clearInterval(gameLoop);
    alert("Game Over!!!!!!!!")
}

function update(){
    //move snake
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
    //wall collision check
/*
    if(x<0){
        gameOver();
    }
    else if(x>boardWidth-snakeSize){
         gameOver();     
    }
     else if(y<0){
         gameOver();     
    }
     else if(y>boardHeight-snakeSize){
         gameOver();     
    }*/
}
//next add everyyhing in to object variables

function draw(){
    drawnigPen.clearRect(0,0,canvas.width,canvas.height);
    drawnigPen.fillStyle="pink";
    drawnigPen.fillRect(x,y,20,20);
    drawnigPen.lineWidth=20;
    const offSet=drawnigPen.lineWidth/2;
    drawnigPen.strokeStyle="blue";
    const boardWidth=canvas.width-drawnigPen.lineWidth;
    const boardHeight=canvas.height-drawnigPen.lineWidth;
    drawnigPen.strokeRect(offSet,offSet,boardWidth,boardHeight);
}
function move(){
    update();
    draw();
    requestAnimationFrame(move);
}
move()
