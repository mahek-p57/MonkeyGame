
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score;
var ground;
var survivaltime=0;

function preload(){
  monkey_running =       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  FoodGroup=new Group();
  obstaclesGroup=new Group();
 
}



function setup() {
    
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  score=0;
}


function draw() {
   background(220);
 
  console.log(score)
  stroke("white");
  textSize(20);
  fill("white");
  text("Score -"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME= "+survivaltime,100,50);
  
  if(keyDown("space")&&monkey.y>=15){
    monkey.velocityY=-10;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
 if(obstaclesGroup.isTouching(monkey)){
  ground.velocityX=0;
  monkey.velocityY=0;
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  
  }
  
  if (ground.x < 900) {
    ground.x = ground.width / 2;
  }
  
  monkey.collide(ground);
  
  food();
  obstacles();
  drawSprites();
}

function food(){
  if(frameCount%80===0){
    banana=createSprite(300,250);
    banana.scale=0.1;
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.velocityX=-4;
    banana.lifetime=150;
    FoodGroup.add(banana);
    
  }
}

function obstacles(){
   if(frameCount%300===-0){
     obstacle=createSprite(300,315);
     obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
     obstacle.velocityX=-4;
     obstacle.lifetime=200;
     obstaclesGroup.add(obstacle);
     
    obstacle.depth = monkey.depth;
    monkey.depth =monkey.depth + 1;
   }
}


