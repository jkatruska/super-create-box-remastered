import Drawable from "./Interfaces/Drawable";
import Position from "./Interfaces/Position";
import Game from "./game";

export default class Platform implements Drawable{
  position: Position
  width: number
  height: number
  game: Game
  image: HTMLImageElement;
  imageLoaded = false;

  constructor(game: Game, x: number, y: number, width: number) {
      this.height = 40;
      this.width = width;
      this.position = {
        x: x,
        y: y
      }
      this.game = game;
      this.image = new Image();
      this.image.src = '../assets/img/construction.png';
      this.image.onload = () => {
        this.imageLoaded = true;
      }
  }

  draw() {
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.fillStyle = 'blue';
    let value = this.position.y;
    this.game.ctx.fillText(value.toString(), this.position.x, this.position.y);
    this.game.ctx.fillText(this.height.toString(), this.position.x + this.width, this.position.y + this.height);
    if (this.imageLoaded) {
      let pattern = this.game.ctx.createPattern(this.image, 'repeat');
      this.game.ctx.fillStyle = pattern;
      this.game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
}