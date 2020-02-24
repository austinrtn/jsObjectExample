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
  constructor(x, y, width, height, acc, color, isComp) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.acc = acc;
    this.color = color;
    this.speed = 1;

    this.isComp = isComp;
    if(isComp){
      this.keys = [87,65,83,68];
      this.currentKey = this.keys[Math.floor(Math.random()*this.keys.length)];
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(keyCode){
    if (this.speed <= player.acc) this.speed++;

    if (keyCode === 87) {
        if((this.y - this.speed) <= 0) this.y = 0;
        else this.y -= this.speed;
    }
    if (keyCode === 65) {
      if((this.x - this.speed) <= 0) this.x = 0;
      else this.x -= this.speed;
    }
    if (keyCode === 83){
      if(((this.y + this.height) + this.speed) >= HEIGHT) this.y = HEIGHT - this.height;
      else this.y += this.speed;
    }
    if (keyCode === 68){
      if(((this.x + this.width) + this.speed) >= WIDTH) this.x = WIDTH - this.width;
      else this.x += this.speed;
    }
  }

  changeSize(keyCode){
    let sizeInc = 10;
    if(keyCode === 73) this.height -= sizeInc;
    if(keyCode === 74) this.width -= sizeInc;
    if(keyCode === 75) this.height += sizeInc;
    if(keyCode === 76) this.width += sizeInc;
    if(keyCode === 79){
      this.width = 10;
      this.height = 10;
    }
  }

  double(keyCode){
    if(keyCode === 50){
      this.width *= 2;
      this.height *= 2;
    } else if(keyCode === 49){
      this.width /= 2;
      this.height /=2;
    }
  }
}

let player = new Rect(10, 10, 25, 25, 2, "#FF0000", false);
var objs = [player];

///////////////////////////////////////////////////////////////

/**********
  GAMELOOP
**********/

function gameLoop() {
  requestAnimationFrame(gameLoop);
  document.getElementById("xCord").innerHTML = "X: " + player.x;
  document.getElementById("yCord").innerHTML = "Y: " + player.y;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (var obj of objs){
    if(obj.isComp) obj.move(obj.currentKey);
    obj.draw();
  }
}
gameLoop();

function addRect(){
  var can = canvas.getBoundingClientRect();


  let x = (event.clientX - can.left) / (can.right - can.left) * WIDTH;
  let y = (event.clientY - can.top) / (can.bottom - can.top) * HEIGHT;
  let width = Math.floor(15 + Math.random()*40);
  let height = Math.floor(15 + Math.random()*40);

  let colors = ["#5DADE2", "#F39C12", "#5D6D7E", "#58D68D"];
  let color = colors[Math.floor(Math.random()*colors.length)];

  console.log(x)
  let rect = new Rect(x, y, width, height, 10, color, true);
  objs.push(rect);
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
  player.move(e.keyCode);
  player.changeSize(e.keyCode);
  player.double(e.keyCode);
});

document.addEventListener("keyup", function(e) {
  player.speed = 1;
});
