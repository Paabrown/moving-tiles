const { Board } = require('./Board.js');

class App {
  constructor(numOfBoards) {
    const rows = 2;
    const columns = 6;
    const sizeOfBigTile = 2;
    
    let currentTilePersonalityIndex = 0;

    for (let boardNo = 0; boardNo < numOfBoards; boardNo++) {
      new Board(rows, columns, sizeOfBigTile, boardNo, numOfBoards - 1, currentTilePersonalityIndex)

      // keeps track of the number of tile personalities used from our db with each new board created
      currentTilePersonalityIndex += rows * (columns - sizeOfBigTile) + 1;
    }
  }
}

module.exports = {
  App
}