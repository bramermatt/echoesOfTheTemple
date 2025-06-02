const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 32;
const MAP_ROWS = 10;
const MAP_COLS = 10;

// Simple map: 0 = floor, 1 = wall
const map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,0,0,1],
  [1,0,1,0,1,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,0,0,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1],
];

let player = { x: 1, y: 1 };

function drawMap() {
  for (let row = 0; row < MAP_ROWS; row++) {
    for (let col = 0; col < MAP_COLS; col++) {
      if (map[row][col] === 1) {
        ctx.fillStyle = "#333";
      } else {
        ctx.fillStyle = "#666";
      }
      ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  // Draw player
  ctx.fillStyle = "gold";
  ctx.fillRect(player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function showMessage(text) {
  document.getElementById("messageBox").innerText = text;
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (map[newY][newX] === 0) {
    player.x = newX;
    player.y = newY;
    checkTile();
  }
}

function checkTile() {
  if (player.x === 4 && player.y === 4) {
    showMessage("You feel warmth… something is buried beneath the floor.");
  } else {
    showMessage("");
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
    case "s":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
    case "a":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
    case "d":
      movePlayer(1, 0);
      break;
  }
  drawMap();
});

drawMap();
showMessage("Use arrow keys or WASD to explore...");
