const { Board } = require('./Board.js');

class App {
  constructor(numOfBoards) {
    const rows = 2;
    const columns = 6;
    const sizeOfBigTile = 2;
    
    let currentTilePersonalityIndex = 0;

    for (let i = 0; i < numOfBoards; i++) {
      new Board(rows, columns, sizeOfBigTile, i, numOfBoards - 1, currentTilePersonalityIndex)

      // keeps track of the number of tile personalities used from our db with each board created
      currentTilePersonalityIndex += rows * (columns - 2) + 1;
    }
  }
}

module.exports = {
  App
}