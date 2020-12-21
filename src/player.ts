import Game from "./game";
import Drawable from './Interfaces/Drawable';
import Position from './Interfaces/Position';
import Movable from './Interfaces/Movable';

export default class Player implements Drawable, Movable {
  game: Game;
  width: number;
  height: number;
  position: Position;
  playerImageLeft: HTMLImageElement;
  playerImageRight: HTMLImageElement;
  imageLoadedLeft: boolean;
  imageLoadedRight: boolean;
  speed: number;
  verticalSpeed: number;
  moveRate: number;
  isJumping: boolean;
  jumpRate: number;
  facingDirection: string;

  constructor(game: Game) {
    this.game = game;
    this.height = 64;
    this.width = 64;
    this.position = {
        x: 30,
        y: this.game.height - this.height - 20
    }
    this.facingDirection = 'left';
    this.imageLoadedLeft = false;
    this.imageLoadedRight = false;
    this.playerImageLeft = new Image();
    this.playerImageLeft.src = '../assets/img/player.png';
    this.playerImageLeft.onload = () => {
      this.imageLoadedLeft = true;
    }
    this.playerImageRight = new Image();
    this.playerImageRight.src = '../assets/img/player_right.png';
    this.playerImageRight.onload = () => {
      this.imageLoadedRight = true;
    }
    this.speed = 0;
    this.verticalSpeed = 0;
    this.moveRate = 5;
    this.jumpRate = 10;
  }

  draw() {
    if (this.imageLoadedLeft && this.facingDirection === 'left') {
      this.game.ctx.drawImage(this.playerImageLeft, this.position.x, this.position.y, this.width, this.height);
    }
    if (this.imageLoadedRight && this.facingDirection === 'right') {
      this.game.ctx.drawImage(this.playerImageRight, this.position.x, this.position.y, this.width, this.height);
    }
  }

  update(dt: number) {
      this.position.x += this.speed;
      this.position.y += this.verticalSpeed;
      if (this.position.x <= 0) {
        this.position.x = 0;
      }
      if (this.position.x + this.width >= this.game.width) {
        this.position.x = this.game.width - this.width;
      }
  }
  
  moveRight() {
    this.speed = this.moveRate;
    this.facingDirection = 'right';
  }
  
  moveLeft() {
    this.speed = -this.moveRate;
    this.facingDirection = 'left';
  }

  stopMovement() {
    this.speed = 0;
  }

  jump() {
    if (this.isJumping)
      return;
    this.isJumping = true;
    this.verticalSpeed = -this.jumpRate;
    setTimeout(() => {
      this.verticalSpeed = 0;
      setTimeout(() => {
        this.verticalSpeed = this.jumpRate
        setTimeout(() => {
          this.verticalSpeed = 0;
          this.isJumping = false
        }, 250);
      }, 150);
    }, 250);
  }
}