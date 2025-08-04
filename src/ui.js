export function drawUI(ctx, player, others) {
  ctx.fillStyle = '#fff';
  ctx.fillText(`Age: ${player.age}`, 20, 20);
  ctx.fillText(`Gold: ${player.gold}`, 20, 40);
  ctx.fillText(`Food: ${player.food}`, 20, 60);
  ctx.fillText(`Wood: ${player.wood}`, 20, 80);
  ctx.fillText(`Stone: ${player.stone}`, 20, 100);
  ctx.fillText(`Kills: ${player.kills}`, 20, 120);

  // Age bar
  ctx.fillStyle = '#444';
  ctx.fillRect(20, 130, 200, 10);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(20, 130, (player.kills % 10) * 20, 10);

  // Leaderboard
  const sorted = Object.values(others).sort((a, b) => (b.gold || 0) - (a.gold || 0));
  ctx.fillText('Leaderboard:', ctx.canvas.width - 150, 20);
  sorted.slice(0, 5).forEach((p, i) => {
    ctx.fillText(`${p.name}: ${p.gold}`, ctx.canvas.width - 150, 40 + i * 20);
  });
}
