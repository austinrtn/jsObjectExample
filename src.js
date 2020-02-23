/**********
  CANVAS
**********/

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const WIDTH = c.width;
const HEIGHT = c.height;

/////////////////////////////////////////////////////

/**********
  RECT OBJ
**********/

class Rect {
  constructor(x, y, width, height, acc, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.acc = acc;
    this.color = color;
    this.speed = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(e){
    if (this.speed <= player.acc) this.speed++;

    if (e.keyCode === 87) player.y -= this.speed;
    else if (e.keyCode === 65) player.x -= this.speed;
    else if (e.keyCode === 83) player.y += this.speed;
    else if (e.keyCode === 68) player.x += this.speed;
  }

  double(e){
    if(e.keyCode === 50){
      this.width *= 2;
      this.height *= 2;
    } else if(e.keyCode === 49){
      this.width /= 2;
      this.height /=2;
    }
  }
}

let player = new Rect(10, 10, 25, 25, 6, "#FF0000");
var objs = [player];

///////////////////////////////////////////////////////////////

/**********
  GAMELOOP
**********/

setInterval(gameLoop, 33);

function gameLoop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (var obj of objs) obj.draw();
  document.getElementById("xCord").innerHTML = "X: " + player.x;
  document.getElementById("yCord").innerHTML = "Y: " + player.y;

}

//////////////////////////////////////////////

/**********
  CONTROLLER
**********/

function changeSpeed() {
  player.acc = document.getElementById("speed").value;
}

function changeColor(){
  player.color = document.getElementById("color").value;
  console.log(player.color)
}

document.addEventListener("keydown", function(e) {
  player.move(e);
  player.double(e);
});

document.addEventListener("keyup", function(e) {
  player.speed = 1;
});
