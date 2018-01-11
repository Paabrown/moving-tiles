const { Board } = require('./Board.js');

class App {
  constructor(numOfBoards) {
    for (let i = 0; i < numOfBoards; i++) {
      new Board(2, 6, 2, i)
    }
  }
}

module.exports = {
  App
}