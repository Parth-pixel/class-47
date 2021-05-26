var bg;
var ground, man, man1, farmer, farmer1;
var moneyGroup, enenemyGroup, hurdleGroup;
var coin;
var ground2;
var groundImage;
var invisibleGround;
var score = 0;
var man1;
var gameState = "intro";
var tile1image,tile2image,tile3image,tile4image,tile5image;
var hurdle;
var introImage;



function preload(){
 bg = loadImage("images/farm2.png");
 man = loadAnimation("images/Run__000.png","images/Run__001.png","images/Run__002.png",
 "images/Run__003.png","images/Run__004.png","images/Run__005.png",
 "images/Run__006.png","images/Run__007.png","images/Run__008.png","images/Run__009.png");
 farmer = loadAnimation("images/Run (1).png","images/Run (2).png","images/Run (3).png",
 "images/Run (4).png","images/Run (5).png","images/Run (6).png","images/Run (7).png","images/Run (8).png");
 coin = loadImage("images/coin.png");
 groundImage = loadImage("images/ground.jpg");
 tile1image = loadImage("images/tile1.png")
 tile2image = loadImage("images/tile2.png")
 tile3image = loadImage("images/tile3.png")
 tile4image = loadImage("images/tile4.png");
 tile5image = loadImage("images/tile5.png");
 introImage = loadImage("images/introBG.jpg");
}

function setup() {
  createCanvas(1500,650);
  
  ground = createSprite(1400,300,20,20);
  ground.addImage(bg);
 // ground.velocityX = -5;
  ground.scale = 0.3;

  ground2 = createSprite(800,630,20,20);
  ground2.addImage(groundImage);
  //ground2.velocityX = -5;
  
  invisibleGround = createSprite(750,630,1500,20);
  invisibleGround.visible = true;
 
  farmer1 = createSprite(50,500,20,20);
  farmer1.addAnimation("running",farmer);
  farmer1.scale = 0.4;
  //farmer1.velocityX=2;
  farmer1.debug = true;
  farmer1.setCollider("rectangle",0,0,350,350);

enemyGroup = new Group();
moneyGroup = new Group();
hurdleGroup = new Group();
  //farmer1.velocityX = 1;
  edges = createEdgeSprites();
}

function draw() {
 // spawnBG();

  if(gameState === "intro"){
    background(introImage);
    console.log("Hello....")
    fill("black");
    text("Hello Everyone..",50,50)
    text("These villagers are suffering from poverty and need money.",100,100);
    text("Please help them in collecting some money. Let's go. Press Enter to play",150,150);
    text("Press Enter to play",200,200);
    if(keyDown("enter")){
      gameState = "start";
    }
  }
  
  else if(gameState === "start"){
    console.log("Hiiii....")
    //spawnBG();
    spawnEnemy();
    money();
    spawnObstacles();
  text("Save Your Village",100,100);
//background("white");
ground.velocityX= -(3+score/100);
ground2.velocityX = -(3+score/100);

if(ground.x<0){
  ground.x = 1100;
}

if(ground2.x<600){
  ground2.x = ground2.width/2;
}
if(keyDown(UP_ARROW)){
  farmer1.y = farmer1.y - 10 ;
}
farmer1.y = farmer1.y  + 3;



//if(keyDown("space") && farmer1.y >= 159) {
 // farmer1.velocityY = -12;
//}

//farmer1.velocityY = farmer1.velocityY + 0.8



for(var i=0;i<moneyGroup.length;i++){ 
  if(moneyGroup.get(i).collide(farmer1)){
     moneyGroup.get(i).destroy();
      score = score+1; }
     }
     for(var i=0;i<moneyGroup.length;i++){ 
      if(moneyGroup.get(i).collide(enemyGroup)){
         moneyGroup.get(i).destroy();
          score = score-1; }
         }

     for(var i=0;i<hurdleGroup.length;i++){ 
      if(hurdleGroup.get(i).collide(farmer1)){
        // hurdleGroup.get(i).destroy();
          }
         }
//farmer1.collide(ground);

farmer1.collide(invisibleGround);
farmer1.collide(hurdleGroup);

drawSprites();
textSize(30);
textFont("Comic Sans MS");
fill("black");
text("Coins Collected: "+score,50,50);
  }
}

function spawnEnemy(){
  if(frameCount%300 === 0){
   var man1 = createSprite(1600,550,20,20);
    man1.addAnimation("running",man);
    man1.scale = 0.3;
    man1.velocityX = -3;
    enemyGroup.add(man1);
  }
 

}

function money(){
  if(frameCount%100 === 0){
    var money = createSprite(2000,600,20,20);
    money.addImage(coin);
    money.velocityX = -5;
    money.scale = 0.05;
    money.debug = true;
    money.setCollider("rectangle",0,0,money.width, money.height);
    moneyGroup.add(money);
    money.y = Math.round(random(100,550));
  }
}

function spawnObstacles(){
  if(frameCount%150 === 0){
    hurdle = createSprite(1950,550,50,50);
  
   
   hurdle.debug = true;
  hurdle.velocityX = -4;
   hurdle.scale = 0.6;
   
   var rand = Math.round(random(1,3));
   switch(rand) {
     case 1: hurdle.addImage(tile1image);
         break;
     case 2: hurdle.addImage(tile2image);
         break;
     case 3: hurdle.addImage(tile3image);
         break;
     case 4 : hurdle.addImage(tile4image);
         break;
     case 5 : hurdle.addImage(tile5image);
         break;


         default:break;
  }
  
  hurdleGroup.add(hurdle);
  hurdleGroup.collide(invisibleGround);
}
}

