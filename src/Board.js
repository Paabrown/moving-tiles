// assumptions:
  // each tileName will be unique


const { populateStorage, checkForConstructionErrors } = require('./board-constructor-helpers');

class Board {
  constructor(rows, columns, sizeOfBigTile) {
    checkForConstructionErrors(rows, columns, sizeOfBigTile);

    this.storage = new Array(rows).fill(null).map(row => {
      return new Array(columns).fill(null);
    });

    this.sizeOfBigTile = sizeOfBigTile;
    
    populateStorage(this, sizeOfBigTile);
  }

  get rows() {
    return this.storage.length;
  }

  get columns() {
    return this.storage[0].length;
  }

  getTileCoordinates(tileObjOrName) {
    // allow user to pass in tile object or tile name string for lookup
    const tileName = tileObjOrName.name || tileObjOrName;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const currentTile = this.storage[i][j];

        if (currentTile.name === tileName) {
          return {
            tile: tile,
            row: i,
            column: j
          }
        }
      }
    }
  }

  getBigTileInfo() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const tile = this.storage[i][j];

        if (tile.isBig) {
          return {
            tile: tile,
            row: i,
            column: j
          }
        }
      }
    }
  }

  set(tile, row, column, isBig) {
    if (isBig) {
      for (let i = row; i < row + this.sizeOfBigTile; i++) {
        for (let j = column; j < column + this.sizeOfBigTile; j++) {
          this.storage[i][j] = tile;
        }
      }
    } else {
      this.storage[row][column] = tile;
    }
  }

  get(row, column) {
    return this.storage[row][column];
  }



  shiftRow(rowIndex, units) {
    // positive units is shifting right, negative is shifting left
    // only use if big tile has already been removed

    const row = this.storage[rowIndex];

    if (units > 0) {
      this.storage[rowIndex] = row.reverse().map((tile, i) => row[i + units]).reverse();
    } else {
      this.storage[rowIndex] = row.map((tile, i) => row[i - units]);
    }

    return this.storage[rowIndex];
  }

  growTile(row, column, ) {

  }

  shrinkTile(tile) {

  }
}

module.exports = {
  Board
}