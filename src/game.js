import { Player } from './player.js';
import { drawMap } from './map.js';
import { spawnResources, drawResources, updateResources } from './resources.js';
import { updateAnimals, drawAnimals } from './animals.js';
import { drawUI } from './ui.js';
import { handleCombat } from './combat.js';
import { drawHotbar } from './hotbar.js';
import { drawMinimap } from './minimap.js';
import { getPlayers } from './network.js';

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let mouseX = 0, mouseY = 0;
let camX = 0, camY = 0;

export let player;

export function startGame(name, color) {
  player = new Player(name, color);
  window.player = player;
  spawnResources();

  canvas.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  canvas.addEventListener('mousedown', () => {
    handleCombat(player);
  });

  requestAnimationFrame(loop);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  camX = player.x - canvas.width / 2;
  camY = player.y - canvas.height / 2;

  drawMap(ctx, camX, camY);
  drawResources(ctx, camX, camY);
  updateResources(player);
  updateAnimals(player);
  drawAnimals(ctx, camX, camY);

  player.update(mouseX + camX, mouseY + camY);
  player.render(ctx);

  drawHotbar(ctx);
  drawUI(ctx, player, getPlayers());
  drawMinimap(ctx, player);

  requestAnimationFrame(loop);
}
