export function handleCombat(player) {
  player.attacking = true;
  setTimeout(() => {
    player.attacking = false;
  }, 1000); // attack cooldown

  if (player.selectedItem === 'apple') {
    if (player.food >= 10 && player.health < 100) {
      player.food -= 10;
      player.health += 10;
      if (player.health > 100) player.health = 100;
    }
  }
}
