import Game from './game';

class App {
  game: Game;
  
  constructor () {
    this.game = new Game();
    this.game.start();
  }
}
new App();
