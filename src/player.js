export class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.x = 500;
    this.y = 500;
    this.dir = 0;
    this.health = 100;
    this.gold = 0;
    this.food = 0;
    this.wood = 0;
    this.stone = 0;
    this.kills = 0;
    this.age = 1;
    this.weapon = 'axe';
    this.selectedItem = 'axe';
    this.attacking = false;
  }

  update(mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    this.dir = Math.atan2(dy, dx);

    if (this.kills >= this.age * 10) this.age++;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.dir);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(10, -5, 4, 0, Math.PI * 2); // eye
    ctx.fill();
    ctx.restore();
  }
}
