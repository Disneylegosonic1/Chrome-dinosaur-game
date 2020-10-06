var trex, obstacles, ground, inground, clouds, trexRun, trexCollide, groundImg, cloudImg, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleGroup, cloudGroup, score, gameOver,overImg, reset, resetImg;
var jump, die, checkpoint;
var PLAY = 1;
var END = 0;
var gameState = "play";
function preload(){
  trexRun = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollide = loadImage("trex_collided.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  overImg = loadImage("gameOver.png");
  resetImg = loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkpoint = loadSound("checkPoint.mp3");
}
function setup() {
  createCanvas(675, 200);
  
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("trexRun", trexRun);
  trex.addAnimation("trexCollide", trexCollide);
  trex.scale = 0.5; 
  
  ground = createSprite(200, 180, 600, 1);
  ground.addImage("groundImg", groundImg);
  
  inground = createSprite(200, 190, 600, 1);
  inground.visible = false;
  
  score = 0;
  
  gameOver = createSprite(338, 75, 10, 10);
  gameOver.addImage("overImg", overImg);
  gameOver.scale = 0.75;
  gameOver.visible = false;
  
  reset = createSprite(338, 110, 10, 10);
  reset.addImage("resetImg", resetImg);
  reset.scale = 0.5;
  reset.visible = false;
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
  
}

function draw() {
  background(240);
  
  if (gameState === "play"){
   
  ground.velocityX = -(5+3*score/100);
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& trex.collide(inground)){
    jump.play();
    trex.velocityY = -12;  

  }
  
  trex.collide(inground);  
    
  trex.velocityY = trex.velocityY + 0.8;
  
  
  score = score + Math.round(getFrameRate()/60);
  text(score, 550, 25);
  
  if(score % 100 === 0 && score>0){
    checkpoint.play();
  }
    
  if(obstacleGroup.isTouching(trex)){
    text("hi", 200, 50);
    gameState = "end";
  }
  
  Clouds();
  Obstacles();
 }
 else if (gameState === "end"){
   die.play();
   ground.velocityX = 0;
   trex.changeAnimation("trexCollide", trexCollide);
   trex.velocityY = 0;
   obstacleGroup.setVelocityXEach(0);
   cloudGroup.setVelocityXEach(0);
   trex.collide(inground);
   cloudGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
   gameOver.visible = true;
   reset.visible = true;
   
   if (mousePressedOver(reset)){
     gameState = "play";
     score = 0;
     obstacleGroup.destroyEach();
     cloudGroup.destroyEach();
     gameOver.visible = false;
     reset.visible = false;
     trex.changeAnimation("trexRun", trexRun);
   }
 }
  drawSprites(); 
}  


function Clouds() {
  
  if (frameCount%60 === 0){
  clouds = createSprite(600,random(80, 120), 20, 20); 
  clouds.addImage("cloudImage", cloudImg);
  cloudGroup.add(clouds);
  clouds.scale = 0.75;
  clouds.velocityX = -5
  trex.depth = clouds.depth + 1;
  clouds.lifetime = 120;  
  }
}

function Obstacles() {
  if (frameCount%100 === 0) {
  obstacles = createSprite(600, 170, 20, 20);
    var r = Math.round (random(1,6));
  switch(r)
    {
      case 1:obstacles.addImage("obstacle1", obstacle1);
      break; 
      case 2:obstacles.addImage("obstacle2", obstacle2);
      break;
      case 3:obstacles.addImage("obstacle3", obstacle3);
      break;
      case 4:obstacles.addImage("obstacle4", obstacle4);
      break;
      case 5:obstacles.addImage("obstacle5", obstacle5);
      break;
      case 6:obstacles.addImage("obstacle6", obstacle6);
      break;
      default: text(r, 125, 50); 
      break;
    }
   obstacles.scale = 0.5;
   obstacles.velocityX = -(5+3*score/100); 
   obstacles.lifetime = 120; 
   obstacleGroup.add(obstacles);
    
  
  }
}
