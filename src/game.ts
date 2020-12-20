import Player from './player';

export default class Game {
  player: Player;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D
  
  constructor() {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d');
    this.player = new Player(this);
    
    this.width = canvas.clientWidth;
    this.height = canvas.clientHeight;
  }
}