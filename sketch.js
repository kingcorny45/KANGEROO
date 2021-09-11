/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle;
var shrubsGroup, shrub1,shrub2,shrub3
var score=0;

var gameOver, restart;

function preload(){
  trex_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  trex_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(0,0,800,400);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=1
  //jungle.x = jungle.width/2;
  
  trex = createSprite(50,250,20,50);
  trex.addAnimation("running", trex_running)
  trex.addAnimation("collided" , trex_collided )
  trex.scale = 0.2
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  trex.setCollider("circle",0,200,150);
  trex.debug = true
  score = 0;
  invisiblejungle = createSprite(200,390,800,10);
  invisiblejungle.visible = false;

}

function draw() {
  background(255);
  if(gameState === PLAY){
    trex.x = camera.position.x-270
    jungle.velocityX=-4
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }

    if(keyDown("space")&& trex.y >=315) {
      trex.velocityY = -13;
    }
    trex.velocityY = trex.velocityY + 0.8


  spawnObstacles()
  spawnShrubs()
  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
    
  }
}else{
  if(gameState===END){
    trex.velocityY=0
    jungle.velocityX=0
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
    obstaclesGroup.setLifetimeEach(-1)
    shrubsGroup.setLifetimeEach(-1)
  }
}
  trex.collide(invisiblejungle)
  drawSprites();


}
function spawnShrubs(){
  if (frameCount % 60 === 0){
    var shrub = createSprite(800,380,10,50);
    shrub.velocityX = -6;
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: shrub.addImage(shrub1);
               break;
       case 2: shrub.addImage(shrub2);
               break;
       case 3: shrub.addImage(shrub3);
       default: break;
     }
//assign scale and lifetime to the obstacle           

shrub.lifetime = 134;
shrub.scale = 0.1
//add each obstacle to the group
shrubsGroup.add(shrub);
}
     
    
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    obstacle = createSprite(900,380,40,50);
    obstacle.addImage(obstacle1);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    
     //assign lifetime to the variable
     obstacle.lifetime = 134;
    
    //adjust the depth
    obstacle.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
    obstaclesGroup.add(obstacle);
  }
}
