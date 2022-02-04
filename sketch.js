var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg, restartimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("images/skybg.jpg");
  waterbg = loadImage("images/waterbg.png");
  shipimg = loadAnimation("images/ship.png", "images/ship2.png", "images/ship.png");
  helicopterimg = loadImage("images/helicopter.png");
  bombimg = loadImage("images/bomb.png");
  restartimg = loadImage("images/gameOver.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(200,350,600,600);
  water.addImage("water ground",waterbg);
 
  //slower speed of animation
  shipimg.frameDelay= 10;
  //creating ship
  ship = createSprite(200,300,50,50);
  ship.addAnimation("ship",shipimg)
  ship.scale = 0.4;
  
  //creating helicopter group
  helicopterGroup = new Group();

  //creating bomb group
  bombGroup = new Group();
  
  score = 0;

  ship.setCollider("rectangle",0,0,400,400);
  //ship.debug = "true";

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
  drawSprites(); 
  
  if(gameState === PLAY){
    
    //set the survival time score
    score = score + Math.round(frameCount/300);
    water.setVelocity(-2,0);
    
    
    if(keyDown("left") && ship.position.x > 60){
      ship.position.x -= 5;
    }
    if(keyDown("right") && ship.position.x < 740){
      ship.position.x += 5;
    }
    

    spawnHelicopter();
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  else if(gameState === END){
    ship.addImage("ship",restartimg)
    water.setVelocity(0,0);
   
    bombGroup.destroyEach();
    helicopterGroup.destroyEach();
    
  
    
  }
  
 
 //infinite background  
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(Math.round(random(10,750)),80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    helicopter.lifetime = 160;
    
    helicopterGroup.add(helicopter);

    bomb = createSprite(helicopter.x,90,20,20);
    bomb.addImage("bomb falling",bombimg);
    bomb.setVelocity(0,5);
    
    bomb.scale = 0.1;
    
    bomb.lifetime = 60;
    
    bombGroup.add(bomb);
  }
}






