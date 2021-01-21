import Player from './player';
import InputHandler from './InputHandler';
import Drawable from './Interfaces/Drawable';
import Movable from './Interfaces/Movable';
import Platform from './Platform';

export default class Game {
  player: Player;
  width: number;
  height: number;
  lastTime: number;
  ctx: CanvasRenderingContext2D;
  renderObjects: (Drawable | Movable)[] = [];
  platforms: Platform[];
  
  constructor() {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d'); 
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
    this.lastTime = 0;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.player = new Player(this);
    this.player.draw();
    this.platforms = this.generatePlatforms();
    //player should be last, because of clipping
    this.renderObjects.push(...this.platforms, this.player);
    new InputHandler(this);
  }

  start() {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(timestamp: number) {
    let dt = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.renderObjects.forEach((object) => {
      if ('update' in object) {
        object.update(dt);
      }
      if ('draw' in object) {
        object.draw();
      }
    });
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  generatePlatforms() {
    let platforms = [];
    const platform_1 = new Platform(this, 200, 450, 600);
    const platform_2 = new Platform(this, 0, 300, 200);
    const platform_3 = new Platform(this, 800, 300, 200);
    const platform_4 = new Platform(this, 200, 150, 600);
    platforms.push(platform_1, platform_2, platform_3, platform_4);
    return platforms;
  }
}