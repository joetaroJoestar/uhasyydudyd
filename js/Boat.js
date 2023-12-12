class Robot {
  constructor(x, y, width, height, robotPos) {
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.robotPosition = robotPos;
    this.image = loadImage("./assets/robot image.png");

    World.add(world, this.body);
  }

  remove(index) {
    setTimeout(() => {
      Matter.World.remove(world, robots[index].body);
      delete robots[index];
    }, 2000);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.robotPosition, this.width, this.height);
    pop();
  }
}
