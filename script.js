let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let player = { x: 200, y: 550, width: 40, height: 20, speed: 5 };
let keys = {};
let blocks = [];
let frame = 0;
let playing = false;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  playing = true;
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!playing) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Player movement
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;
  
  // Draw player
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Add new blocks
  if (frame % 60 === 0) {
    let size = 30 + Math.random() * 20;
    blocks.push({
      x: Math.random() * (canvas.width - size),
      y: -size,
      size: size,
      speed: 2 + Math.random() * 3
    });
  }
  
  // Update and draw blocks
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    b.y += b.speed;
    ctx.fillStyle = "#ff0044";
    ctx.fillRect(b.x, b.y, b.size, b.size);
    
    // Collision
    if (
      b.x < player.x + player.width &&
      b.x + b.size > player.x &&
      b.y < player.y + player.height &&
      b.y + b.size > player.y
    ) {
      gameOver();
      return;
    }
  }
  
  // Remove off-screen blocks
  blocks = blocks.filter(b => b.y < canvas.height);
  
  frame++;
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  playing = false;
  alert("💥 Game Over!");
  location.reload();
}
