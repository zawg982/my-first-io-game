let animals = [];

function spawnAnimal(type, x, y) {
  const stats = {
    pig: { hp: 50, dmg: 0, food: 50, gold: 50 },
    cow: { hp: 50, dmg: 0, food: 50, gold: 50 },
    wolf: { hp: 100, dmg: 10, food: 100, gold: 250 },
    bull: { hp: 150, dmg: 30, food: 100, gold: 1000 }
  }[type];

  animals.push({
    type,
    x,
    y,
    name: type + '_' + Math.floor(Math.random() * 1000),
    ...stats,
    maxHp: stats.hp
  });
}

for (let i = 0; i < 20; i++) {
  const types = ['pig', 'cow', 'wolf', 'bull'];
  const type = types[Math.floor(Math.random() * types.length)];
  spawnAnimal(type, Math.random() * 2000, Math.random() * 2000);
}

export function updateAnimals(player) {
  for (const a of animals) {
    const dist = Math.hypot(a.x - player.x, a.y - player.y);

    if (a.type === 'wolf' || a.type === 'bull') {
      if (dist < 300) {
        const dx = player.x - a.x;
        const dy = player.y - a.y;
        const mag = Math.hypot(dx, dy);
        a.x += (dx / mag) * 1;
        a.y += (dy / mag) * 1;
      }
      if (dist < 30) {
        player.health -= a.dmg;
      }
    }

    if (a.hp <= 0) continue;

    if (dist < 30 && player.attacking) {
      a.hp -= 25;
      if (a.hp <= 0) {
        player.gold += a.gold;
        player.food += a.food;
        player.kills += 1;
      }
    }
  }
}

export function drawAnimals(ctx, camX, camY) {
  for (const a of animals) {
    if (a.hp <= 0) continue;
    ctx.fillStyle = a.type === 'wolf' ? '#aaa' : a.type === 'bull' ? '#b32' : '#fca';
    ctx.beginPath();
    ctx.arc(a.x - camX, a.y - camY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Name & health bar
    ctx.fillStyle = '#fff';
    ctx.fillText(a.name, a.x - camX - 20, a.y - camY - 25);

    ctx.fillStyle = 'red';
    ctx.fillRect(a.x - camX - 20, a.y - camY - 15, 40, 5);
    ctx.fillStyle = 'lime';
    ctx.fillRect(a.x - camX - 20, a.y - camY - 15, 40 * (a.hp / a.maxHp), 5);
  }
}

