  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var score;

  var knife,knifeImage;
  var gameOverImage;

  var fruit,f1,f2,f3,f4,fruitGroup;

  var alien,a1,alienGroup;
  var s1,s2;

  function preload(){

    knifeImage = loadImage("sword.png");
    gameOverImage = loadImage("gameover.png");
    a1 = loadAnimation("alien1.png","alien2.png");
    f1 = loadImage("fruit1.png");
    f2 = loadImage("fruit2.png");
    f3 = loadImage("fruit3.png");
    f4 = loadImage("fruit4.png");
    s1 = loadSound("knifeSwooshSound.mp3");
    s2 = loadSound("gameover.mp3");
  }

  function setup(){
    createCanvas(400,400);

    knife = createSprite(200,200,10,10);
    knife.addImage(knifeImage);
    knife.scale = 0.7;
    knife.setCollider("rectangle",0,0,150,100);
    
    fruitGroup = createGroup();
    alienGroup = createGroup();

    score = 0;


  }

  function draw(){
    
    background("lightblue");
    textSize(17);
    fill("blue");
    text("Score:" + score,320,40);


    if(gameState === PLAY){
      fruits();
      enemy();
      
      knife.x = mouseX;
      knife.y = mouseY;
      
   if(fruitGroup.isTouching(knife)){
     fruitGroup.destroyEach();
     score = score + 2;
     s1.play();
      } 
      
      if(alienGroup.isTouching(knife)){
        gameState = END;
        s2.play();
      }
    }

    if(gameState === END){
      knife.addImage(gameOverImage);
      knife.x = 200;
      knife.y = 200;
      fruitGroup.destroyEach();
      alienGroup.destroyEach();
    }
    
    drawSprites();
  }

  function fruits(){
    if(World.frameCount%80 === 0){
      fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(f1);
    }
    if(r == 2){
      fruit.addImage(f2);
    } 
    if(r == 3){
      fruit.addImage(f3);
    }  
    if(r == 4){
      fruit.addImage(f4);
    }    
    var pos = Math.round(random(1,4));
      if(pos === 1){
        fruit.x = 400;
        fruit.velocityX = -(7 + score/4);
      }
      if(pos === 2){
        fruit.x = 0;
        fruit.velocityX = (7 + score/4);
      }
      if(pos === 3){
        fruit.y = 400;
        fruit.velocityY = -(7 + score/4);
      }
      if(pos === 4){
        fruit.y = 0;
        fruit.velocityY = (7 + score/4);
      }
      
      fruit.y = Math.round(random(50,340));
      
      fruit.setLifetime = 100;
      fruitGroup.add(fruit);
    }
  }
    
    
  function enemy(){
    if(World.frameCount%200 === 0){
      alien = createSprite(400,200,20,20);
      alien.addAnimation("moving",a1);
      alien.y = Math.round(random(100,300));
      var pos = Math.round(random(1,2));
      if(pos === 1){
        alien.x = 400;
        alien.velocityX = -(8 + score/10);
      }
      if(pos === 2){
        alien.x = 0;
        alien.velocityX = (8 + score/10);
      }
      alien.setLifetime = 50;
      alienGroup.add(alien);
     }
  }
  