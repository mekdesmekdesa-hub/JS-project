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
let newHead;
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
    let gridOffset=snakeBodyX%snakeBody[0].size;
   
    food.x=Math.floor(Math.random()*(board.width/snakeBody[0].size))*snakeBody[0].size+gridOffset;
    food.y=Math.floor(Math.random()*(board.height/snakeBody[0].size))*snakeBody[0].size+gridOffset;
    
     return {
        x:Math.floor(Math.random()*(board.width/snakeBody[0].size))*snakeBody[0].size+gridOffset,
        y:Math.floor(Math.random()*(board.height/snakeBody[0].size))*snakeBody[0].size+gridOffset,
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
   
    //check direction and update snakeBodyX and snakeBodyY accordingly

    if (direction==="LEFT"){
         newHead={
            x:snakeBodyX-20,
            y:snakeBodyY,
            size:20
         }
        }
    else if(direction==="RIGHT"){
        newHead={
            x:snakeBodyX+20,
            y:snakeBodyY,
            size:20
       
        }
    }
    else if(direction==="UP"){
        newHead={
            x:snakeBodyX,
            y:snakeBodyY-20,
            size:20
        }
    }
    else if(direction==="DOWN"){
        newHead={
            x:snakeBodyX,
            y:snakeBodyY+20,
            size:20
        }
    }
    //check wall collision.............needs debuging snake goes beyond blur line
    if(newHead.x<offSet || newHead.x>board.width-snakeBody[0].size-offSet|| newHead.y<offSet || newHead.y>board.height-snakeBody[0].size-offSet){
        gameOver();
    }
    else{
        snakeBodyX=newHead.x;
        snakeBodyY=newHead.y;
    }
    //check food collision
    if (food.x===snakeBodyX && food.y===snakeBodyY){
        snakeBody.unshift(newHead);
        food=generateFood();}
    else{
        snakeBody.pop();
        snakeBody.unshift(newHead);}

        
        
    }


//beyond MVP... difficulty level, using velocity instead of direction,work on start and pause and restart button
function draw(){
      drawnigPen.clearRect(0,0,canvas.width,canvas.height);
    //draw food
    drawnigPen.fillStyle="red";
    drawnigPen.fillRect(food.x,food.y,food.size,food.size);
    //draw snake body
    drawnigPen.fillStyle="pink";
    for (let part of snakeBody){
        drawnigPen.fillRect(part.x,part.y,snakeBody[0].size,snakeBody[0].size);
    }
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
//game over screen and restart button ...game over  function