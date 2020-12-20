import Game from "./game";
import Drawable from './Interfaces/Drawable';
import Position from './Interfaces/Position';
import Movable from './Interfaces/Movable';

export default class Player implements Drawable, Movable {
  game: Game;
  width: number;
  height: number;
  position: Position;
  playerImage: HTMLImageElement;
  imageLoaded: boolean;
  speed: number;
  moveRate: number;

  constructor(game: Game) {
    this.game = game;
    this.height = 50;
    this.width = 50;
    this.position = {
        x: 30,
        y: this.game.height - this.height - 20
    }
    this.imageLoaded = false;
    this.playerImage = new Image();
    this.playerImage.src = '../assets/img/player.png';
    this.playerImage.onload = () => {
      this.imageLoaded = true;
    }
    this.speed = 0;
    this.moveRate = 5;
  }

  draw() {
    if (this.imageLoaded) {
      this.game.ctx.drawImage(this.playerImage, this.position.x, this.position.y, this.width, this.height);
    }
  }

  update(dt: number) {
      this.position.x += this.speed;
      if (this.position.x <= 0) {
        this.position.x = 0;
      }
      if (this.position.x + this.width >= this.game.width) {
        this.position.x = this.game.width - this.width;
      }
  }
  
  moveRight() {
    this.speed = this.moveRate;
  }
  
  moveLeft() {
    this.speed = -this.moveRate;
  }

  stopMovement() {
    this.speed = 0;
  }
}