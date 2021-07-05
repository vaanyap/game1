var blossomImg, bubblesImg, cryingBubblesImg, villainImg, backgroundImg,fireballImg, happyBlossomImg,sadBlossom,defeated, happyVillain, happyBubbles;
var arrowImg, arrow;
var bowImg, bow,justBowImg;
var blossom, bubbles, villain, backGround,fireBall;
var gameOverImg, gameOver;
var gameState="Play";
var Play = 1;
var Over = 0;
var obstacleGroup;
var bowGroup;
var arrowGroup;


function preload(){
  blossomImg = loadImage("blossom.png");
  bubblesImg = loadImage("bubbles.png");
  cryingBubblesImg = loadImage("cryingBubbles.png");
  happyBubbles = loadAnimation("Bubbles1.png");
  villainImg = loadImage("villian.png");
  backgroundImg = loadImage("background.jpeg");
  fireballImg = loadImage("fireball.png");
  cryingBubblesImg = loadAnimation("cryingBubbles.png");
  happyBlossomImg = loadAnimation("happyBlossom.png");
  sadBlossom = loadAnimation("sadblossom.png");
  defeated = loadAnimation("defeated.png");
  happyVillain = loadAnimation("happyVillain.png");
  gameOverImg = loadImage("gameOver.png");
  arrowImg =loadImage("arrow.png");
  bowImg = loadImage("bow and arrow.png");
  justBowImg = loadAnimation("bow2.png");
}

function setup() {
  createCanvas(800,400);
  backGround = createSprite(400,200,400,5);
  backGround.addImage(backgroundImg);
  backGround.scale = 0.7;
  backGround.velocityX =-3;
  
  blossom = createSprite(750,300);
  blossom.addImage(blossomImg);
  blossom.scale= 0.11;
  blossom.addAnimation("happy",happyBlossomImg);
  blossom.addAnimation("sad",sadBlossom);
  
  bubbles = createSprite(100,270);
  bubbles.addImage(bubblesImg);
  bubbles.scale = 0.15;
  bubbles.addAnimation("cry",cryingBubblesImg);
  bubbles.addAnimation("happyB", happyBubbles);
  //bubbles.debug = true;
  bubbles.setCollider("circle",1,1);
  
  villain= createSprite(650,250);
  villain.addImage(villainImg);
  villain.scale = 0.6;
  villain.addAnimation("defeat",defeated);
  villain.addAnimation("happyV",happyVillain);
  
  
  
  arrowGroup = new Group();
  bowGroup = new Group();
  obstacleGroup = new Group();
 
}

function draw() {
  
background(0);
  drawSprites();
  BOW();

  var edges= createEdgeSprites();
   bubbles .collide(edges);
  
  if(gameState =="Play"){
    
    if(backGround.x<353){
      backGround.x = 400;

    }
   
    if(frameCount%20 == 0){
    villain.y = Math.round(random(30,380));
      console.log("villain forming");
    }
    if(keyDown("up")){
      bubbles.y-=5;
      bowGroup.velocityY  = bubbles.velocityY;

      
    }
    if(keyDown("down")){
      bubbles.y+=5;
      bowGroup.y =bubbles.y;

    }
    if(keyDown("left")){
      bubbles.x-=5;
      bowGroup.x = bubbles.x;
    }
    if(keyDown("right")){
      bubbles.x+=5;
      bowGroup.x = bubbles.x;
    }
    
    spawingObstacles();
     Arrow();
    if(arrowGroup.isTouching(obstacleGroup)||arrowGroup.isTouching(villain)){
    obstacleGroup.destroyEach();
    arrowGroup.destroyEach();

  }
    
    if(bubbles.isTouching(blossom)){
       backGround.x = 400;
      obstacleGroup.destroyEach();
      bow.visible = false;
      villain.y = 150;
      villain.x = 300;

      
      villain.changeAnimation("defeat",defeated);
      villain.scale = 0.4;
      blossom.changeAnimation("happy",happyBlossomImg)
      blossom.scale = 0.3;
      bubbles.changeAnimation("happyB", happyBubbles);
      bubbles.scale = 0.09;
      bubbles.y=200
      bubbles.x = 650;
      blossom.y = 200;
      blossom.x = 750;
      fill("#4B0082");
      textSize(50);
      text("YOU SAVED BLOSSOM!", 150,270);
      
    }
    
    
    if(bubbles.isTouching(villain)||bubbles.isTouching(obstacleGroup)){
      gameState = "Over";

     
    }
  }
  
  if(gameState == "Over"){
    obstacleGroup.destroyEach()
    backGround.x = 400;
    fill("#4B0082");
    textSize(35);
    text("Mojo Jojo Won :((", 150,215);
    text("You couldn't save blossom :(",110,250);
   // gameOver.visible = true;
    bubbles.changeAnimation("cry",cryingBubblesImg);
    bubbles.scale = 0.1;
    blossom.scale = 0.25;
    blossom.changeAnimation("sad",sadBlossom);
    villain.scale= 0.25;
    villain.x= 600;
    villain.y = 200;
    villain.changeAnimation("happyV",happyVillain);
    bubbles.x= 400;
    bubbles.y = 300;
    arrowGroup.destroyEach();
    bow.visible = false;

  }
  
 
}

function spawingObstacles(){
   if(frameCount%60==0){
    fireBall = createSprite(500,villain.y);
     //fireBall.debug = true;
    fireBall.setCollider("rectangle",0,0,150,250);
     fireBall.lifetime = 200;
    fireBall.addImage(fireballImg);
    fireBall.y=villain.y;
    fireBall.velocityX = -6 
    fireBall.scale= 0.3;
    obstacleGroup.add(fireBall);
     
  }
}
function BOW(){
   bow = createSprite(bubbles.x+10, bubbles.y);
  bow.addImage(bowImg);
  bow.scale = 0.12;
  bow.addAnimation("justBow", justBowImg);
  bow.lifetime =2;
   
}
function Arrow(){
 
  
  
     // arrow.visible = false;
    
  
  if(keyDown("space")){
    arrow =createSprite(bow.x+10,bow.y);
  
    arrow.x = bow.x
    arrow.y=bow.y;
    arrow.velocityX = 4;
    arrow.lifetime = 200;

   //arrow.debug= true;
    arrow.addImage(arrowImg);
      arrow.scale = 0.15;
      bow.changeAnimation("justBow", justBowImg);
     // arrow.visible = true;
      arrow.setCollider("rectangle",0,0,300,50);
    arrowGroup.add(arrow);
  }
}