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
let snakeBody=[{
    x:50,
    y:50,
    size:20
    }]
drawnigPen.fillStyle="pink";
drawnigPen.fillRect(
    snakeBody[0].x,
    snakeBody[0].y,
    snakeBody[0].size,
    snakeBody[0].size
)
//snake eye
drawnigPen.fillStyle="black";
drawnigPen.arc(62,58,4,0, Math.PI*2);
drawnigPen.fill();
//movement 
let snakeBodyX=snakeBody[0].x;
let snakeBodyY=snakeBody[0].y;
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
//food


let food={
    x:0,
    y:0,
    size:20
}

function generateFood(){
    let gridOffset=snakeBodyX%snakeBody.size;
   
    food.x=Math.floor(Math.random()*(board.width/snakeBody.size))*snakeBody.size+gridOffset;
    food.y=Math.floor(Math.random()*(board.height/snakeBody.size))*snakeBody.size+gridOffset;
    
     return {
        x:Math.floor(Math.random()*(board.width/snakeBody.size))*snakeBody.size+gridOffset,
        y:Math.floor(Math.random()*(board.height/snakeBody.size))*snakeBody.size+gridOffset,
        size:20
    }
}

generateFood();
//game loop starts here
let gameLoop=requestAnimationFrame(move);
let lastUpdateTime=0;
let speed=200;


function gameOver(){
    cancelAnimationFrame(gameLoop);

   
}
//move snake after checking next position is not colliding with wall
function update(){
    let nextX=snakeBodyX;
    let nextY=snakeBodyY;
    //check direction and update nextX and nextY

    if (direction==="LEFT"){
         nextX=snakeBodyX-20;
        }
    else if(direction==="RIGHT"){
        nextX=snakeBodyX+20;
       
        }
    
    else if(direction==="UP"){
        nextY=snakeBodyY-20;
    }
    else if(direction==="DOWN"){
         nextY=snakeBodyY+20;
        
    }
    //check wall collision.............needs debuging snake goes beyond blur line
    if(nextX<offSet || nextX>board.width-snakeBody.size-offSet|| nextY<offSet || nextY>board.height-snakeBody.size-offSet){
        gameOver();
    }
    else{
        snakeBodyX=nextX;
        snakeBodyY=nextY;
    }
    //check food collision
    if (food.x===snakeBodyX && food.y===snakeBodyY){
        food=generateFood();
        
    }

}
//beyond MVP... difficulty level, using velocity instead of direction,work on start and pause and restart button
function draw(){
      drawnigPen.clearRect(0,0,canvas.width,canvas.height);
    //draw food
    drawnigPen.fillStyle="red";
    drawnigPen.fillRect(food.x,food.y,food.size,food.size);
    //draw snake body
    drawnigPen.fillStyle="pink";
    drawnigPen.fillRect(snakeBodyX,snakeBodyY,snakeBody.size,snakeBody.size);
    drawnigPen.lineWidth=20;
    const offSet=drawnigPen.lineWidth/2;
    drawnigPen.strokeStyle="blue";
    const boardWidth=canvas.width-drawnigPen.lineWidth;
    const boardHeight=canvas.height-drawnigPen.lineWidth;
    drawnigPen.strokeRect(offSet,offSet,boardWidth,boardHeight);
}
function move(currentTime){
    if(currentTime-lastUpdateTime>=speed){
        lastUpdateTime=currentTime;
        update();
        draw();
    }
    gameLoop=requestAnimationFrame(move);
}
move()
//next add food and score