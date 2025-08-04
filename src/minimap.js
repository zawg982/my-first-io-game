export function drawMinimap(ctx, player) {
  const scale = 0.05;
  const x = ctx.canvas.width - 110;
  const y = ctx.canvas.height - 110;
  ctx.fillStyle = '#222';
  ctx.fillRect(x, y, 100, 100);

  // Player dot
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + player.x * scale, y + player.y * scale, 3, 0, Math.PI * 2);
  ctx.fill();
}
