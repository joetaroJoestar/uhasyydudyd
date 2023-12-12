const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var robots = [];

var dataInicial = new Date()
var tempoInicial = dataInicial.getTime()
var tempo = 0

var score = 20;

var hitMarker
var gameState = 1
var isAlive = true

var time = - 1



function preload() {
  backgroundImg = loadImage("./assets/dsds.avif");
  towerImage = loadImage("./assets/mil base.png");
  hitMarker = loadImage("./assets/hitMarker.png");
}

function setup() {
  canvas = createCanvas(1698, 801);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 550, 360, 110, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(270, 550, 130, 100, angle);
}

function draw() {
  background(189);
  time = time - 0.0001
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();


  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithRobot(i);
  }


  cannon.display();

  if(gameState === 1) {
    showRobots();
    collisionWithRobot();



    fill("white")
    textSize(20)
    text("Tempo: ", 200, 50)
    text(tempo/1000, 300, 50)
    dataAtual = new Date()
    tempoAtual = dataAtual.getTime()
    tempo = tempoAtual - tempoInicial

    fill("white")
    textSize(20)
    text("Score: ", 200, 70)
    text(score, 300, 70)
    dataAtual = new Date()
    tempoAtual = dataAtual.getTime()
    tempo = tempoAtual - tempoInicial
  }


 
  
  if (tempo >= 180000 && isAlive) {
    fill("white")
    textSize(20)
    text("Game end: You win! ", 200, 20)
    gameState = 2
}
if (score <= 0) {
  isAlive = false
  fill("white")
  textSize(20)
  text("Game end: You lose!", 200, 20)
  gameState = 2
  }

} 
function collisionWithRobot(index) {
  for (var i = 0; i < robots.length; i++) {
    if (balls[index] !== undefined && robots[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, robots[i].body);

      if (collision.collided) {
        robots[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }


   if ( robots[i] !== undefined) {
  if(robots[i].body.position.x<360){
    console.log("AQUI!!!")
    Matter.Body.setVelocity(robots[i].body, {
      x: time,
      y: 0
    });
    
    score = score - 0.001

  }
     // if (collision.collided) {
      //  console.log("Aquiiii")
     // }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function showRobots() {
  if (robots.length > 0) {
    if (
      robots[robots.length - 1] === undefined ||
      robots[robots.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var robot = new Robot(width, height - 100, 80, 80, position);

      robots.push(robot);
    }

     
    for (var i = 0; i < robots.length; i++) {
      if (robots[i]) {

        console.log(robots[i].body.x)
        Matter.Body.setVelocity(robots[i].body, {
          x: -1.9,
          y: 0
        });

        robots[i].display();
      } else {
        robots[i];
      }
    }
  } else {
    var robot = new Robot(width, height - 60, 80, 80, -80);
    robots.push(robot);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    setTimeout(function () {
      balls[balls.length - 1].shoot()
    }, 1000);
  }
}
