import Game from "./game";

export default class Player {
  game: Game;
  constructor(game: Game) {
    this.game = game;
    let playerImage = new Image();
    playerImage.src = '../assets/img/player.png';
    playerImage.onload = () => {
      game.ctx.drawImage(playerImage, 20, 20);
    }
    console.log("aidasiodhsa");
  }
}