var PLAY = 1;
var END = 0;
var gameState = 1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var ground
var survivalTime=0;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}
function draw() {
  background(300);
  
  if (gameState===PLAY){
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  food();
  rocks();
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score, 500,500);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);  
  if (obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  } else if (gameState===END){
    monkey.velocityY=0;
    ground.velocityX=0;
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1); 
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);    
  }
  
  drawSprites();
}

function food(){
  
  if (frameCount % 80 === 0) {
    banana=createSprite(400,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(120,200));
    banana.velocityX=-5;
    banana.lifetime=80;
    bananaGroup.add(banana);
  }
}

function rocks(){
  if (frameCount % 300 === 0){
    obstacle=createSprite(400,310,30,30);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
  }
}