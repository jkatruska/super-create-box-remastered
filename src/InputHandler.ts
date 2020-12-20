import Game from "./game"

export default class InputHandler {
  game: Game;

  constructor(game: Game) {
    this.game = game;
    document.addEventListener("keydown", (event) => {
      switch(event.keyCode) {
        case 39:
          this.game.player.moveRight();
          break;
        case 37:
          this.game.player.moveLeft();
          break;
      }
    });
    
    document.addEventListener("keyup", (event) => {
      switch(event.keyCode) {
        case 39:
        case 37:
          this.game.player.stopMovement();
          break;
      }
    });
  }
}