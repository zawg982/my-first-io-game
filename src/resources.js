let resources = [];

export function spawnResources() {
  for (let i = 0; i < 100; i++) {
    const types = ['tree', 'rock', 'bush'];
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * 2000;
    const y = Math.random() * 2000;
    resources.push({
      type,
      x,
      y,
      health: 100,
      maxHealth: 100
    });
  }
}

export function drawResources(ctx, camX, camY) {
  for (const res of resources) {
    ctx.fillStyle = res.type === 'tree' ? '#0f0' : res.type === 'rock' ? '#888' : '#f66';
    ctx.beginPath();
    ctx.arc(res.x - camX, res.y - camY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(res.x - camX - 20, res.y - camY - 25, 40, 5);
    ctx.fillStyle = 'lime';
    ctx.fillRect(res.x - camX - 20, res.y - camY - 25, 40 * (res.health / res.maxHealth), 5);
  }
}

export function updateResources(player) {
  for (const res of resources) {
    if (res.health <= 0) continue;
    const dist = Math.hypot(res.x - player.x, res.y - player.y);
    if (dist < 30 && player.weapon === 'axe' && player.attacking) {
      res.health -= 25;
      if (res.health <= 0) {
        if (res.type === 'tree') player.wood += 10;
        else if (res.type === 'rock') player.stone += 10;
        else if (res.type === 'bush') player.food += 10;
      }
    }
  }
}
