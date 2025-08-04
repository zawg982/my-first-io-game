export function drawHotbar(ctx) {
  const items = ['axe', 'apple'];
  items.forEach((item, i) => {
    ctx.fillStyle = item === window.player.selectedItem ? '#fff' : '#555';
    ctx.fillRect(20 + i * 60, ctx.canvas.height - 80, 50, 50);
    ctx.fillStyle = '#000';
    ctx.fillText(item, 25 + i * 60, ctx.canvas.height - 50);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '1') window.player.selectedItem = 'axe';
    if (e.key === '2') window.player.selectedItem = 'apple';
  });
}
