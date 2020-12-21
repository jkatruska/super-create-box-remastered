import Game from "./game"

export default class InputHandler {
  game: Game;

  constructor(game: Game) {
    this.game = game;
    document.addEventListener("keydown", (event) => {
      switch(event.keyCode) {
        case 37:
          this.game.player.moveLeft();
          break;
        case 38:
          this.game.player.jump();
          break;
        case 39:
          this.game.player.moveRight();
          break;
      }
    });
    
    document.addEventListener("keyup", (event) => {
      switch(event.keyCode) {
        case 37:
          if (this.game.player.facingDirection === 'left') {
            this.game.player.stopMovement();
          }
          break;
        case 39:
          if (this.game.player.facingDirection === 'right') {
            this.game.player.stopMovement();
          }
          break;
      }
    });
  }
}