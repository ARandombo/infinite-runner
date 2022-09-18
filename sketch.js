var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jet;
var ground, groundImage;

var obstaclesGroup, obstacle1

var score;
var gameOverImg,restartImg
var checkPointSound, dieSound

function preload(){
   
  Jet = loadImage("jet.jpg")
  
  groundImage = loadImage("ground2.png");
  
  
  
 obstacle1 =loadImage("obstacle1.png")
 obstacle2 =loadImage("obstacle2.png") 
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

 
function setup() {
  createCanvas(600, 200);


  
  jet = createSprite(50,160,20,50);
 
  jet.addImage("Flying", Jet);
  

  jet.scale = 0.2;
  
  ground= createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 0.4

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  

  
 // jet.setCollider("rectangle",0,0,trex.width,trex.height);
 // jet.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/30);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& jet.y >= 100) {
        jet.velocityY = -12;
        
    }
    
    //add gravity
    jet.velocityY = jet.velocityY + 0.8
  
    
  
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(jet)){
        
        
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
    
    
     
     
      ground.velocityX = 0;
      jet.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
     
     obstaclesGroup.setVelocityXEach(0);
      
     if(mousePressedOver(restart)) {
      reset();
    } 
   }
  
 
  
 
  
  


  drawSprites();
}

function reset(){
  gameState= PLAY
  
  
  obstaclesGroup.destroyEach()
   
   score= 0
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
     
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.05;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}



