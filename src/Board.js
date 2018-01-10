// assumptions:
  // that growTile is passed a valid rowsToGrow and colsToGrow args


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

  getbigTile() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const currentTile = this.get(i, j);

        if (tile.isBig) {
          return currentTile;
        }
      }
    }
  }

  getTileCoordinates(tileObj) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const currentTile = this.get(i , j);

        if (currentTile === tileObj) {
          return {
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

  growTile(tileRow, tileColumn, rowsToGrow, columnsToGrow) {
    // for rowsToGrow and TilesToGrow, a positive number indicates to the right/down, and a negative number indicates to the left/up
    const tile = this.get(tileRow, tileColumn);
    
    if (tile.isBig === true) {
      throw new Error('Error! Trying to grow a tile that already claims to be big!');
    }

    let smallestRow = tileRow;
    let smallestColumn = tileColumn;

    if (rowsToGrow < 0) {
      smallestRow = smallestRow + rowsToGrow;
    }

    if (columnsToGrow < 0) {
      smallestColumn = smallestColumn + columnsToGrow;
    }

    this.set(tile, smallestRow, smallestColumn, true);

    tile.isBig = true;
  }

  shrinkTile(tileRow, tileColumn) {
    const tile = this.get(tileRow, tileColumn);

    tile.isBig = false;
  }
}

module.exports = {
  Board
}