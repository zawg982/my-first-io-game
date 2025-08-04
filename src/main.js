import { startGame } from './game.js';
import { initNetwork } from './network.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const homeScreen = document.getElementById('homeScreen');
const playBtn = document.getElementById('playBtn');

playBtn.onclick = () => {
  const name = document.getElementById('username').value.trim();
  const color = document.getElementById('skinColor').value;
  if (!name) return alert("Enter your name!");
  homeScreen.style.display = 'none';
  initNetwork(name, color);
  startGame(name, color);
};
