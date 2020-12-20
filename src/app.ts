import Game from './game';

class App {
  game: Game;
  
  constructor () {
    this.game = new Game();
    this.game.start();
  }
}
const app = new App();
