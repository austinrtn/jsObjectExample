
/**********
  CANVAS
**********/

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const WIDTH = c.width;
const HEIGHT = c.height;

/////////////////////////////////////////////////////

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
