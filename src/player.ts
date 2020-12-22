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
  maxFallingHeight: number;
  timeouts: NodeJS.Timeout[];

  constructor(game: Game) {
    this.game = game;
    this.height = 64;
    this.width = 64;
    this.position = {
        x: 400,
        y: this.game.height - this.height - 400
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
    this.maxFallingHeight = 0;
    this.timeouts = [];
  }

  draw() {
    if (this.imageLoadedLeft && this.facingDirection === 'left') {
      this.game.ctx.drawImage(this.playerImageLeft, this.position.x, this.position.y, this.width, this.height);
    }
    if (this.imageLoadedRight && this.facingDirection === 'right') {
      this.game.ctx.drawImage(this.playerImageRight, this.position.x, this.position.y, this.width, this.height);
    }
    let txt = this.position.y + this.height;
    this.game.ctx.fillText(txt.toString(), this.position.x, this.position.y+this.height);
    this.game.ctx.fillText(this.position.y.toString(), this.position.x, this.position.y);
  }

  update(dt: number) {
      if (this.verticalSpeed <= 0 && !this.isJumping) {
          this.verticalSpeed = 7;
      }
      this.position.x += this.speed;
      this.position.y += this.verticalSpeed;
      if (this.position.x <= 0) {
        this.position.x = 0;
      }
      if (this.position.x + this.width >= this.game.width) {
        this.position.x = this.game.width - this.width;
      }
      this.detectColisionWithPlatform();
      if (this.position.y >= this.maxFallingHeight) {
        this.position.y = this.maxFallingHeight;
      }
      if (this.position.y <= 0) {
        this.position.y = 0;
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
    let jump = null;
    let stopMidAir = null; 
    let fall = null;
    jump = setTimeout(() => {
      this.verticalSpeed = 0;
      stopMidAir = setTimeout(() => {
        this.verticalSpeed = this.jumpRate
        fall = setTimeout(() => {
          this.verticalSpeed = 0;
          this.isJumping = false
        }, 250);
      }, 150);
    }, 250);
    this.timeouts.push(jump, stopMidAir, fall);
  }
  
  stopJumping(){
    this.timeouts.forEach((timeout) => {
        clearTimeout(timeout);
    });
    this.verticalSpeed = 0;
    this.isJumping = false;
  }

  detectColisionWithPlatform() {
    let isOverPlatform = false;
    this.game.platforms.forEach((platform) => {
      if (this.position.x >= platform.position.x - this.width &&
          this.position.x <= platform.position.x + platform.width &&
          this.position.y < platform.position.y &&
          this.position.y + this.height < platform.position.y + platform.height
         ) {
          this.maxFallingHeight = platform.position.y - this.height;
          isOverPlatform = true;
      }
      if (this.position.x >= platform.position.x - this.width &&
          this.position.x <= platform.position.x + platform.width &&
          Math.ceil(this.position.y / 10) * 10 === Math.ceil((platform.position.y + platform.height) / 10) * 10
         ) {
          this.stopJumping();
      }
    })
    if (!isOverPlatform) {
      this.maxFallingHeight = this.game.height - this.height;
    }    
  }
}