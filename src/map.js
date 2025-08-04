export function drawMap(ctx, camX, camY) {
  for (let y = -1000; y < 2000; y += 100) {
    for (let x = -1000; x < 2000; x += 100) {
      let color = '#444';
      if (y < 500) color = '#99f';     // arctic
      else if (y > 1000) color = '#cc9'; // sand
      else if (y > 700 && y < 800) color = '#3399cc'; // river
      ctx.fillStyle = color;
      ctx.fillRect(x - camX, y - camY, 100, 100);
    }
  }
}
