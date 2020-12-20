import Player from './player';
import InputHandler from './InputHandler';

export default class Game {
  player: Player;
  width: number;
  height: number;
  lastTime: number;
  ctx: CanvasRenderingContext2D
  
  constructor() {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d'); 
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.lastTime = 0;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.player = new Player(this);
    this.player.draw();
    new InputHandler(this);
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(timestamp: number) {
    let dt = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.player.update(dt);
    this.player.draw();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
}