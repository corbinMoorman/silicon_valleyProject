var gameState = "start"
var fsImg1, fsImg2
var rightRunanimation, leftRunanimation
var jump1, jump2
var jL, jR
var runL, runR ,zRWalk,zLwalk
var bgImg
var futureSldr
var zLDead, zRDead, zLAttack,zRAttack
var titleImg
var playBtn, backBtn, storyBtn
var bulletImg
var score=0
var platform1,platform2
var life = 5
var defeatImg, youWinImg
var acidRainImg, aRain
var lZombieHealth = 3
var rZombieHealth = 3 
var mBFlyLeftAnimation
var mBFlyRightAnimation
var mBFRHealth = 3
var mBFLHealth = 3
var life = 9
var score = 0
var winSound , defeatSound
var gunShotSound
var zSound






function preload(){
//titleAndBackground  
bgImg = loadImage("background.png")
titleImg = loadImage("zSlayer_title.png")
//victory and defeatImages
youWinImg = loadImage("youWin.png")
defeatImg = loadImage("defeat.png")
//buttons
playBtn = loadImage("playBtn.png")
backBtn = loadImage("backButton.png")
storyBtn = loadImage("storyButton.png")
bulletImg = loadImage("bullet.png")
//soldierAnimations  
fsImg1 = loadAnimation("future_soldier1.png")
fsImg2 = loadAnimation("future_soldier2.png")
jump1 = loadAnimation("fsldr_jump1.png")
jump2 = loadAnimation("fsldr_jump2.png")
rightRunanimation = loadAnimation("fsldr_runR1.png","fsldr_runR2.png","fsldr_runR3.png","fsldr_runR4.png","fsldr_runR5.png","fsldr_runR6.png")
leftRunanimation = loadAnimation("fsldr_runL2.png","fsldr_runL3.png","fsldr_runL4.png","fsldr_runL5.png")
//zombieAnimation
zRWalk = loadAnimation("zL_walk1.png", "zL_walk2.png","zL_walk3.png","zL_walk4.png", "zL_walk5.png", "zL_walk6.png", "zL_walk7.png", "zL_walk8.png")
zRDead = loadAnimation("zL_dead10.png","zL_dead20.png","zL_dead30.png","zL_dead40.png",)
zRAttack = loadAnimation("zL_attack10.png", "zL_attack20.png", "zL_attack30.png", "zL_attack40.png", "zL_attack50.png", "zL_attack60.png", "zL_attack70.png", "zL_attack80.png")

zLWalk = loadAnimation("zR_walk10.png", "zR_walk20.png","zR_walk30.png","zR_walk40.png","zR_walk50.png","zR_walk60.png","zR_walk70.png","zR_walk80.png","zR_walk90.png")
zLAttack = loadAnimation("zR_attack10.png","zR_attack20.png","zR_attack30.png","zR_attack40.png","zR_attack50.png","zR_attack60.png","zR_attack70.png","zR_attack80.png")
zLDead = loadAnimation("zR_dead10.png","zR_dead20.png","zR_dead30.png","zR_dead40.png")
//acidrain
acidRainImg = loadImage("acidRain.png")
//mutantBird Animation
mBFlyLeftAnimation = loadAnimation("mB_Lrun10.png","mB_Lrun20.png","mB_Lrun30.png","mB_Lrun40.png")
mBFlyRightAnimation = loadAnimation("mB_Rrun10.png","mB_Rrun20.png","mB_Rrun30.png","mB_Rrun40.png")

//sounds
zSound = loadSound("zombieSound.wav")
winSound = loadSound("winSound.wav")
gunShotSound = loadSound("gunSound.wav")
defeatSound = loadSound("gameOver.wav")
}



function setup() {
  createCanvas(900,600);
  title =  createSprite(500,250,10,20)
  title.addImage(titleImg)
  title.scale = 2
 
  startButton = createSprite(478, 340, 50, 50);
  startButton.addImage(playBtn)
  startButton.scale = 2
  
  //bullet group
  bulletGroup = new Group()
  
  //zrwalk group
   zRightWalkGroup = new Group()

   //zlwalk group
   zLeftWalkGroup = new Group()

   //acidrain group
   acidGroup = new Group()
   //mutantBirdGroups
   mBFR_Group = new Group()
   mBFL_Group = new Group()

   
   
   

  

  //PC
  futureSldr = createSprite(466,486,70,70)
  futureSldr.addAnimation("normal1",fsImg1)
  futureSldr.addAnimation("normal2",fsImg2)
  futureSldr.addAnimation("jumpL",jump1)
  futureSldr.addAnimation("jumpR",jump2)
  futureSldr.addAnimation("RunL",leftRunanimation)
  futureSldr.addAnimation("RunR",rightRunanimation)
  futureSldr.changeAnimation("normal1",fsImg1)
  futureSldr.scale = 2

  
 
  //invisibleGround
  invisibleGround = createSprite(450,545,900,10)
  invisibleGround.visible = false

  //platforms
  platform1 = createSprite(222,305,150,10)
  platform1.visible = false

  platform2 = createSprite(670,305,150,10)
  platform2.visible = false
  
  //score and life
  heading= createElement("h1");
  scoreboard= createElement("h1");

  //defeat
  defeat = createSprite(471,310,50,50)
  defeat.addImage(defeatImg)
  defeat.scale = 2
  defeat.visible = false

  win = createSprite(471,280,50,50)
  win.addImage(youWinImg)
  win.scale = 3
  win.visible = false

  //level2
  nextLevel = createSprite(460,510)
  nextLevel.scale = 0.5
  nextLevel.visible = false
 
  futureSldr.setCollider("rectangle",-1,0,futureSldr.width-20,futureSldr.height-10);
  futureSldr.debug = false
  
  
}
function draw() {
  background(bgImg) 
  

   // Start 
   if(gameState ===  "start"){
    
    
    //change gameState to play
    if(mousePressedOver(startButton)){
     gameState = "play"
     startButton.destroy()
     
    }
   }

   //play state
   if(gameState ===  "play"){
  //score
  textSize(20)
  text("Score: "+ score, 50,50);

    //scoreboard.html("Score: "+score)
    //scoreboard.style('color:red'); 
    //scoreboard.position(width-200,20)
    

  //PC life
  textSize(20)
  text("Life: "+ life, 50,20);

    //heading.html("Life: "+life)
    //heading.style('color:red'); 
    //heading.position(150,20)
  

  

  //npc
     title.visible = false
      platform1.visible = true
      platform2.visible = true
  
    
    spawnRightZombies()
    spawnLeftZombies()
    spawnNpcRight()
    spawnNpcLeft()
    
    //PC movement
    if(keyWentDown(LEFT_ARROW)){
      futureSldr.velocityX = -5
      futureSldr.changeAnimation("RunL")
      
    } 
    if(keyWentUp(LEFT_ARROW)){
      
      futureSldr.changeAnimation("normal2")
      futureSldr.velocityX = 0
    } 
    if(keyWentDown(RIGHT_ARROW)){
      futureSldr.velocityX = 5
      futureSldr.changeAnimation("RunR")
    }
    if(keyWentUp(RIGHT_ARROW)){
    
      futureSldr.changeAnimation("normal1")
      futureSldr.velocityX = 0
    } 
    if(keyWentDown(UP_ARROW)){
      futureSldr.velocityY = -20
      futureSldr.changeAnimation("jumpL")
    }
    if(keyWentUp(UP_ARROW)){
      futureSldr.changeAnimation("normal1")
      futureSldr.velocityY = 1
    }
  // zombie attack  
  if(zLeftWalkGroup.collide(futureSldr)){
    zLeftWalk.changeAnimation("zLA", zLAttack)
    zLeftWalk.lifetime = 0
    life = life-1
  }
  if(zRightWalkGroup.collide(futureSldr)){
    zRightWalk.changeAnimation("zRA", zRAttack)
    zRightWalk.lifetime = 0
    life= life-1
   }
  //MB damage
  if(mBFL_Group.collide(futureSldr)){
    mBFL.lifetime = 0
    life = life-1
  }
  if(mBFR_Group.collide(futureSldr)){
    mBFR.lifetime = 0
    life = life-1
  }
    //futuresldr defeat zombie
  if(keyIsDown(83)){
    shootBulletRIght()
    futureSldr.changeAnimation("normal1")
    gunShotSound.play()
  }

  if(keyIsDown(65)){
    shootBulletLeft()
    futureSldr.changeAnimation("normal2")
    gunShotSound.play()
  }
  if(bulletGroup.collide(zLeftWalkGroup)){
    bulletGroup.destroyEach()
    lZombieHealth = lZombieHealth -1
    }

  if(bulletGroup.collide(zRightWalkGroup)){
    bulletGroup.destroyEach()
    rZombieHealth = rZombieHealth -1

  }
  if(bulletGroup.collide(mBFR_Group)){
    bulletGroup.destroyEach()
    mBFRHealth = mBFRHealth -1
  }
  if(bulletGroup.collide(mBFL_Group)){
    bulletGroup.destroyEach()
    mBFLHealth = mBFLHealth -1
  }
  //zombieHealth
  if(rZombieHealth === 0){
    zRightWalkGroup.destroyEach()
    spawnRightZombies()
    score = score +5

  }
  if(lZombieHealth === 0){
    zLeftWalkGroup.destroyEach()
    spawnLeftZombies()
    score = score +5
  }
  
  //MB health
  if(mBFLHealth === 0){
    mBFL_Group.destroyEach()
    score = score +5
  }
  if(mBFRHealth === 0){
    mBFR_Group.destroyEach()
    score = score +5
  }
    
    //applying Gravity
    futureSldr.velocityY = futureSldr.velocityY +1
   

   //colliding the future soldier with the ground 
   futureSldr.collide(invisibleGround)
   futureSldr.collide(platform2)
   futureSldr.collide(platform1)
   

   //colliding zombies with ground
   zRightWalkGroup.collide(invisibleGround)
   zLeftWalkGroup.collide(invisibleGround)
  
  //adding acidRain
  if(frameCount % 60 === 0){
    drawacidRain()
  }
  //applying damage from acid rain
  if(acidGroup.collide(futureSldr)){
    life = life-1
    acidGroup.destroyEach()
   
  }

  // ending the level1(gameState = endLose)
  if(life === 0){
    gameState = "endLose" 
    defeatSound.play() 
   
  }
//endWinlevel1
  if(score > 5000){
    gameState = "endWinlevel1"
    futureSldr.visible = true  
    winSound.play()
  }
}
   
  if(gameState === "endWinlevel1"){
    zLeftWalkGroup.destroyEach()
    zRightWalkGroup.destroyEach()
    win.visible = true
    nextLevel.visible = true
    futureSldr.visible = true
    futureSldr.collide(invisibleGround)
    futureSldr.velocityX = 0
    futureSldr.velocityY = 0


    if(mousePressedOver(nextLevel)){
       gameState = "level2"
       console.log("mousepresedworking")
       score = 0 
       life = 9
    }
    
  }

  //changing to level2
  
  if(gameState === "level2"){
    textSize(15)
    text("life" + life,50,20)

    
    text("score" + score,50,50)

    
    futureSldr.collide(platform1)
    futureSldr.collide(platform2)
    
   
   
    
   
    spawnNpcLeft2()
    spawnNpcRight2()
    spawnLeftZombiesLevel2()
    spawnRightZombiesLevel2()
    drawacidRainLevel2()

    win.visible = false
    futureSldr.visible = true
    nextLevel.visible = false
    level2_basics()

    futureSldr.collide(invisibleGround)
    futureSldr.velocityY = futureSldr.velocityY +1
 //collision with birds
    
    if(mBFL_Group.collide(futureSldr)){
      life = life - 1
      mBFL_Group.destroyEach()
    }
    if(mBFR_Group.collide(futureSldr)){
      life = life - 1
      mBFR_Group.destroyEach()
    }
     //collision with rain
     if(acidGroup.collide(futureSldr)){
       life = life -1
       acidGroup.destroyEach()

     }
     //bullet collision level2
     if(bulletGroup.collide(mBFR)){
       mBFRHealth = mBFRHealth - 3
     }
     if(bulletGroup.collide(mBFL)){
      mBFLHealth = mBFLHealth - 3
    }
    //defeating mosters
    if(mBFLHealth < 0){
      mBFL_Group.destroyEach()
      score = score+5
    }
    if(mBFRHealth < 0){
      mBFR_Group.destroyEach()
      score = score+5
    }

    if(life === 0){
      gameState = "endLose"  
      defeatSound.play()
     
    }
  
    drawacidRainLevel2()
    //winning level2
    if(score > 6000){
       gameState = "level2win"
       winSound.play()
    }
   
       
  } 

  if(gameState === "level2win"){
    textSize(20)
    text("Well done you beat the game.",320,100)
    
     nextLevel.visible = false
     win.visible = true

     futureSldr.velocityX = 0
     futureSldr.velocityY = 0
     futureSldr.collide(invisibleGround)
     futureSldr.collide(platform1)
     futureSldr.collide(platform2)
     score = 0 
     life = 9
     

    

    
  }

//gamestate End Lose
if(gameState === "endLose"){
    futureSldr.destroy()
    zLeftWalk.lifetime = 0
    zRightWalk.lifetime = 0
    defeat.visible = true
    
    if(keyCode === 82){
      reset()
      futureSldr = createSprite(466,486,70,70)
      futureSldr.addAnimation("normal1",fsImg1)
      futureSldr.addAnimation("normal2",fsImg2)
      futureSldr.addAnimation("jumpL",jump1)
      futureSldr.addAnimation("jumpR",jump2)
      futureSldr.addAnimation("RunL",leftRunanimation)
      futureSldr.addAnimation("RunR",rightRunanimation)
      futureSldr.changeAnimation("normal1",fsImg1)
      futureSldr.scale = 2
    }
      
    
    


    textSize(20)
    fill("red")
    text("press 'R' to restart", 475,540)
  }
  drawSprites();


}
//---------level1---->
//Npc
function spawnRightZombies(){
  if(frameCount % 132 === 0){
   zRightWalk = createSprite(0,500, 10,10)
   zRightWalk.lifetime = 360
   zRightWalk.addAnimation("zLW", zLWalk)
   zRightWalk.addAnimation("zRA", zRAttack)
   zRightWalk.addAnimation("zLD", zLDead)
   zRightWalk.velocityX = 5
   zRightWalk.scale = 1.4
   zRightWalkGroup.add(zRightWalk)
   rZombieHealth = 3
  }
  
}
//Npc
function spawnLeftZombies(){
  if(frameCount % 100 === 0){
    zLeftWalk = createSprite(900,510, 10,10)
    zLeftWalk.lifetime = 360
    zLeftWalk.addAnimation("zRW", zRWalk)
    zLeftWalk.addAnimation("zLA", zLAttack)
    zLeftWalk.addAnimation("zRD", zRDead)
    zLeftWalk.velocityX = -5
    zLeftWalk.scale =  1.4
    zLeftWalkGroup.add(zLeftWalk)
    lZombieHealth = 3
    

   }
   
}
//bullet
function shootBulletRIght(){
 if(frameCount % 4 === 0){
  bullet= createSprite(150, width/2, 50,20)
  bullet.x = futureSldr.x 
  bullet.y = futureSldr.y 
  bullet.addImage(bulletImg)
  bullet.scale=1.1
  bullet.velocityX= 25
  bulletGroup.add(bullet)
  bullet.lifetime = 100
  gunShotSound.play()
 
 }
}
function shootBulletLeft(){
  if(frameCount % 4 === 0){
   bullet= createSprite(150, width/2, 50,20)
   bullet.x = futureSldr.x 
   bullet.y = futureSldr.y 
   bullet.addImage(bulletImg)
   bullet.scale=1.1
   bullet.velocityX= -25
   bulletGroup.add(bullet)
   bullet.lifetime = 100
   gunShotSound.play()

  }
 }
function reset(){
  gameState = "play"
  defeat.visible = false
  life = 9
  score = 0
 
  
}
//npc
function drawacidRain(){
  aRain = createSprite(random(10,870),1,10,10)
  aRain.addImage(acidRainImg)
  aRain.velocityY = 5
  aRain.lifetime = 180
  aRain.scale = 0.5
  acidGroup.add(aRain)
  
  
}
function spawnNpcRight(){
  if(frameCount % 260 === 0){
    mBFR = createSprite(880,250,10,10)
    mBFR.addAnimation("mBFRA",mBFlyRightAnimation)
    mBFR.velocityX = -3
    mBFR.lifetime = 360
    mBFR.scale = 1
    mBFR_Group.add(mBFR)
    mBFRHealth = 3
  
}
}

function spawnNpcLeft(){
  if(frameCount % 180 === 0){
    mBFL = createSprite(0,250,10,10)
    mBFL.addAnimation("mBFLA", mBFlyLeftAnimation)
    mBFL.velocityX = 3
    mBFL.lifetime = 360
    mBFL.scale = 1
    mBFL_Group.add(mBFL)
    mBFLHealth = 5

  }
}
//--------level2--->
function spawnNpcLeft2(){
  if(frameCount % 160 === 0){
    mBFL = createSprite(0,250,10,10)
    mBFL.addAnimation("mBFLA", mBFlyLeftAnimation)
    mBFL.velocityX = 7
    mBFL.lifetime = 250
    mBFL.scale = 1
    mBFL_Group.add(mBFL)
    mBFLHealth = 2

  }
}
function spawnNpcRight2(){
  if(frameCount % 200 === 0){
    mBFR = createSprite(880,250,10,10)
    mBFR.addAnimation("mBFRA",mBFlyRightAnimation)
    mBFR.velocityX = -7
    mBFR.lifetime = 250
    mBFR.scale = 1
    mBFR_Group.add(mBFR)
    mBFRHealth = 2
  
}
}
function spawnRightZombiesLevel2(){
  if(frameCount % 100 === 0){
   zRightWalk = createSprite(0,500, 10,10)
   zRightWalk.lifetime = 180
   zRightWalk.addAnimation("zLW", zLWalk)
   zRightWalk.addAnimation("zRA", zRAttack)
   zRightWalk.addAnimation("zLD", zLDead)
   zRightWalk.velocityX = 6
   zRightWalk.scale = 1.4
   zRightWalkGroup.add(zRightWalk)
   rZombieHealth = 5
  }
  
}
//Npc
function spawnLeftZombiesLevel2(){
  if(frameCount % 100 === 0){
    zLeftWalk = createSprite(900,510, 10,10)
    zLeftWalk.lifetime = 180
    zLeftWalk.addAnimation("zRW", zRWalk)
    zLeftWalk.addAnimation("zLA", zLAttack)
    zLeftWalk.addAnimation("zRD", zRDead)
    zLeftWalk.velocityX = -6
    zLeftWalk.scale =  1.4
    zLeftWalkGroup.add(zLeftWalk)
    lZombieHealth = 5
    

   }
   
}

function drawacidRainLevel2(){
  if(frameCount % 20 === 0){
  aRain = createSprite(random(10,870),1,10,10)
  aRain.addImage(acidRainImg)
  aRain.velocityY = 7
  aRain.lifetime = 180
  aRain.scale = 0.5
  acidGroup.add(aRain)
  }
}
function level2_basics(){
  
  //shooting and defeating zombies
  if(keyIsDown(83)){
    shootBulletRIght()
    futureSldr.changeAnimation("normal1")
  }

  if(keyIsDown(65)){
    shootBulletLeft()
    futureSldr.changeAnimation("normal2")
  }
  if(bulletGroup.collide(zLeftWalkGroup)){
    bulletGroup.destroyEach()
    lZombieHealth = lZombieHealth -2
    }

  if(bulletGroup.collide(zRightWalkGroup)){
    bulletGroup.destroyEach()
    rZombieHealth = rZombieHealth -2

  }
  //zombieHealth
  if(rZombieHealth < 0){
    zRightWalkGroup.destroyEach()
    spawnRightZombies()
    score = score +5
  }
  if(lZombieHealth < 0){
    zLeftWalkGroup.destroyEach()
    spawnLeftZombies()
    score = score +5
  }
   //PC movement
   if(keyWentDown(LEFT_ARROW)){
    futureSldr.velocityX = -5
    futureSldr.changeAnimation("RunL")
    
  } 
  if(keyWentUp(LEFT_ARROW)){
    
    futureSldr.changeAnimation("normal2")
    futureSldr.velocityX = 0
  } 
  if(keyWentDown(RIGHT_ARROW)){
    futureSldr.velocityX = 5
    futureSldr.changeAnimation("RunR")
  }
  if(keyWentUp(RIGHT_ARROW)){
  
    futureSldr.changeAnimation("normal1")
    futureSldr.velocityX = 0
  } 
  if(keyWentDown(UP_ARROW)){
    futureSldr.velocityY = -20
    futureSldr.changeAnimation("jumpL")
  }
  if(keyWentUp(UP_ARROW)){
    futureSldr.changeAnimation("normal1")
    futureSldr.velocityY = 1
  }
// zombie attack  
if(zLeftWalkGroup.collide(futureSldr)){
  zLeftWalk.changeAnimation("zLA", zLAttack)
  zLeftWalk.lifetime = 0
  life = life-1
}
if(zRightWalkGroup.collide(futureSldr)){
  zRightWalk.changeAnimation("zRA", zRAttack)
  zRightWalk.lifetime = 0
  life= life-1
 }
}



