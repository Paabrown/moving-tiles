const { Tile } = require('./Tile.js');
const { names } = require('../views/tileDesignBank');

function populateStorage(board, sizeOfBigTile, controllers) {
  let nameIndex = 1;

  const bigTile = new Tile('biggie', true, board.boardNo, controllers);

  board.set(bigTile, 0, 0);
  bigTile.view.render(true);

  for (let i = 0; i < board.rows; i++) {
    for (let j = sizeOfBigTile; j < board.columns; j++) {
      const newTile = new Tile(names[nameIndex++], false, board.boardNo, controllers);
      board.set(newTile, i, j);
    }
  }
}

function checkForConstructionErrors(rows, columns, sizeOfBigTile) {
  const errors = [];

  rows < 2 ? errors.push('there must be two or more rows!') : null;
  columns < 3 ? errors.push('there must be 3 or more columns!') : null;
  sizeOfBigTile < 2 ? errors.push('size of big tile must be at least 1!') : null;
  sizeOfBigTile > rows || sizeOfBigTile > (columns - 1) ? errors.push('the bigTile size is too big for your board!') : null;
  rows % sizeOfBigTile !== 0 ? errors.push('the number of rows must be divisible by the length of one side of a big tile!') : null;

  let errorStr = errors.join('\\n');

  if (errorStr) {
    throw new Error(errorStr);
  }
}

module.exports = {
  populateStorage,
  checkForConstructionErrors
}