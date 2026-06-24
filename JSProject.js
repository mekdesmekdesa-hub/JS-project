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
//snake eye....too complex for MVP
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

//add score counter and display it on the screen
let score=0;
let scoreCounter=document.getElementById("score");

function increaseScore(){
    score++; 
    scoreCounter.textContent=score;
}
//high score counter
let highScore=Number(localStorage.getItem("highScoreStorage"))|| 0;
let highScoreCounter=document.getElementById("highScore");
highScoreCounter.textContent=highScore;

function updateHighScore(){

    if(score>highScore){
        highScore=score;
        localStorage.setItem("highScoreStorage",highScore);
        highScoreCounter.textContent=highScore;
    }
}
updateHighScore();
//game loop starts here
let gameLoop=requestAnimationFrame(move);
let lastUpdateTime=0;
let speed=200;


//game state and game over screen
let gameState="running";

function gameOver(){
    gameState="over";

    drawnigPen.fillStyle="black";
    drawnigPen.fillRect(0,0,canvas.width,canvas.height);
    drawnigPen.fillStyle="red";
    drawnigPen.font="50px Arial";
    drawnigPen.textAlign="center";
    drawnigPen.fillText("Game Over+ Your score is: "+score,canvas.width/2,canvas.height/2);
   

   
}
//paly/pause button and functionality
function toggleGameState(){
    if(gameState==="running"){
        gameState="paused";
        cancelAnimationFrame(gameLoop);
        pauseButton.textContent="Resume";
        drawnigPen.fillStyle="rgba(0, 0, 0, 0.5)";
        drawnigPen.fillRect(0, 0, canvas.width, canvas.height);
        drawnigPen.fillStyle="white";
        drawnigPen.font="50px Arial";
        drawnigPen.textAlign="center";
        drawnigPen.fillText("Game Paused",canvas.width/2,canvas.height/2);
    }
    else if(gameState==="paused"){
        gameState="running";
        lastUpdateTime=performance.now();
        gameLoop=requestAnimationFrame(move);   
        pauseButton.textContent="Pause";
    }
}
const pauseButton=document.getElementById("pauseButton");
pauseButton.addEventListener("click",toggleGameState);
//restart button and functionality
function restartGame(){
    snakeBody=[{
        x:50,
        y:50,
        size:20
    }];
    snakeBodyX=snakeBody[0].x;
    snakeBodyY=snakeBody[0].y;
    direction="RIGHT";
    score=0;
    scoreCounter.textContent=score;
    food=generateFood();
    gameState="running";
    lastUpdateTime=performance.now();
    gameLoop=requestAnimationFrame(move);

    drawnigPen.clearRect(0,0,canvas.width,canvas.height);       
    drawnigPen.fillStyle="white";
    drawnigPen.font="50px Arial";
    drawnigPen.textAlign="center";
    drawnigPen.fillText("Game Restarted",canvas.width/2,canvas.height/2);   
}
const restartButton=document.getElementById("restartButton");
restartButton.addEventListener("click",restartGame);
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
        updateHighScore();
    }
    else{
        snakeBodyX=newHead.x;
        snakeBodyY=newHead.y;
    }
    //check food collision and update snake body accordingly
    if (food.x===snakeBodyX && food.y===snakeBodyY){
        snakeBody.unshift(newHead);
        increaseScore();
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
    // game over screen
    if (gameState==="over"){
        drawnigPen.fillStyle="black";
        drawnigPen.fillRect(0,0,canvas.width,canvas.height);
        drawnigPen.fillStyle="red";
        drawnigPen.font="50px Arial";
        drawnigPen.textAlign="center";
        drawnigPen.fillText("Game Over! Your score is: "+score,canvas.width/2,canvas.height/2);

    }
}
function move(currentTime){
    if(gameState==="running"){
    if(currentTime-lastUpdateTime>=speed){
        lastUpdateTime=currentTime;
        update();
        draw();
    }
    gameLoop=requestAnimationFrame(move);
}
     else{
       gameLoop= cancelAnimationFrame(gameLoop);
    }
}
move()


//pause/play button and functionality
//restart button and functionality
//speed update after eating food a certain number of times
//fix bug where snake goes beyond the wall beyond blue line
