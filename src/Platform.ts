import Drawable from "./Interfaces/Drawable";
import Position from "./Interfaces/Position";
import Game from "./game";

export default class Platform implements Drawable{
  position: Position
  width: number
  height: number
  game: Game

  constructor(game: Game, x: number, y: number, width: number) {
      this.height = 30;
      this.width = width;
      this.position = {
        x: x,
        y: y
      }
      this.game = game;
  }

  draw() {
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.game.ctx.fillStyle = 'blue';
    let value = this.position.y;
    this.game.ctx.fillText(value.toString(), this.position.x, this.position.y);
    this.game.ctx.fillText(this.height.toString(), this.position.x + this.width, this.position.y + this.height);
  }
}