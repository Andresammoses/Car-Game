var PLAY=1;
var END=0;
var gameState = 1;

var road,roadImage;
var carGroup,car1,car2,car3;
var dblueCar,dblueCarImage;

var starGroup,star,starImage;
 
var  dieSound,greatSound;

var score=0;

function preload(){
  roadImage = loadImage("Road-1.jpg");
  
  car1 = loadImage("red car.png");
  car2 = loadImage("blue car.png");
  car3 = loadImage("yellow car.png");
  
  dblueCarImage = loadImage("dblue.png");

  starImage = loadImage("star.svg");
  dieSound = loadSound("Car+Crash.mp3");
  greatSound = loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(600,500);
  
  road = createSprite(300,300);
  road.addImage(roadImage);
  road.scale =1;
  
  dblueCar = createSprite(300,370)
  dblueCar.addImage(dblueCarImage);
  dblueCar.scale = 0.2;
  dblueCar.debug = false;
  
  
  
  carGroup = createGroup();
  starGroup = createGroup();
 dblueCar.setCollider("rectangle",0,0,dblueCar.width,dblueCar.height);
 
  
 
}

function draw() {
  
  if(gameState===PLAY){
  road.velocityY = 20;
  
  
   Car();
    star();
  
  if(road.y > 300){
    road.y = 200;  
  }

  if(keyDown("right_arrow")){
    dblueCar.x = dblueCar.x + 4;
  }
  if(keyDown("left_arrow")){
     dblueCar.x = dblueCar.x - 4;
}

  if(dblueCar.isTouching(carGroup)){
     carGroup.destroyEach();
     dblueCar.destroy(); 
     starGroup.destroyEach();
    dieSound.play();
   
     gameState=END;
     
     }
  if(dblueCar.isTouching(starGroup)){
    starGroup.destroyEach();
    greatSound.play();
    
     score = score+2;
  }
  console.log(carGroup.velocityY);
  
 drawSprites();
  stroke("white");
  fill("white");
  textSize(30);
  text("Score:"+ score, 405,50);
  }
  if(gameState===END){
  carGroup.setVelocityYEach(0);
  carGroup.setLifetimeEach(-1);
  starGroup.setLifetimeEach(-1);
   starGroup.setVelocityYEach(0);
    
  
  road.velocityY=0;
   stroke("yellow");
    fill("yellow");
    textSize(50);
    text("Game Over", 180,250)
}
}
function Car(){
 if(World.frameCount%100===0){
   car = createSprite(200,50);
   car.scale = 0.6;
   car.debug = false;
   
   
   r=Math.round(random(1,3));
   if(r==1){
     car.addImage(car1);
   }else if(r==2){
     car.addImage(car2);
   }else if(r==3){
     car.addImage(car3);
   }
   car.x=Math.round(random(100,500));
   car.velocityY = 5;
   car.lifetime = 500;
   carGroup.add(car);
   carGroup.velocityY=-(400+(score/1))
   
 }
}
function star(){
  if(frameCount%200===0){
     var star = createSprite(200,50)
     star.addImage(starImage);
     star.x=Math.round(random(100,500))
     star.velocityY = 3;
     star.lifetime = 500;
     starGroup.add(star);
     star.scale=0.1;
     star.debug=false;
           star.setCollider("rectangle",0,0,30,30);
     
     }

}