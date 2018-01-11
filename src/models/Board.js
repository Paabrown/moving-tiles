// assumptions:
  // that growTile is passed a valid rowsToGrow and colsToGrow args
  // that all tiles are already on the board, and placed their in constructor


// to dos
  // fix it so the big tile only resides on one place
  // fix it so that a growing tile can grow to a larger shape depending on the programmer

const { BoardView } = require('../views/BoardView.js');
const { populateStorage, checkForConstructionErrors, populateTileSlotPositions } = require('./board-constructor-helpers');

class Board {
  constructor(rows, columns, sizeOfBigTile) {
    checkForConstructionErrors(rows, columns, sizeOfBigTile);
    
    this.view = new BoardView(rows, columns);
    
    // model layer
    this.sizeOfBigTile = sizeOfBigTile;
    this.storage = new Array(rows).fill(null).map(row => {
      return new Array(columns).fill(null);
    });
    populateStorage(this, sizeOfBigTile);
    
    // connection to view layer
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
        const currentTile = this.get(i, j) || {};

        if (currentTile.isBig) {
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

  set(tile, row, column) {
    // console.log('about to set ', row, column);
    // console.log('about to set tile ', tile);
    this.storage[row][column] = tile;

    if (tile) {
      this.view.renderTileMove(tile, row, column);
    }
  }

  get(row, column) {
    return this.storage[row][column];
  }

  removeTile(tileObj) {
    console.log('looking to remove ', tileObj.name);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const currentTile = this.get(i , j);
        
        if (currentTile === tileObj) {
          console.log('currenttile.name, tileobj.name', currentTile.name, tileObj.name)
          console.log('i, j', i, j);
          this.set(null, i, j);
        }
      }
    }
  }

  shiftRow(rowIndex, startingIndex, endingIndex, units) {
    // positive units is shifting right, negative is shifting left
    // only use if big tile has already been removed

    const rowCopy = this.storage[rowIndex].slice();

    for (let j = startingIndex; j <= endingIndex; j++) {
      let indOfTileToInsert = j - units;
      let tileToInsert = (indOfTileToInsert >= startingIndex && indOfTileToInsert <= endingIndex) ? rowCopy[indOfTileToInsert] : null;
      this.set(tileToInsert, rowIndex, j);
    }

    return this.storage[rowIndex];
  }

  growTile(tile, tileRow, tileColumn, rowsToGrow, columnsToGrow) {
    console.log('growTile boardjs 104 - tileRow, tileColumn', tileRow, tileColumn)
    console.log('growTile boardjs 105 - rowsToGrow, columnsToGrow', rowsToGrow, columnsToGrow)
    // for rowsToGrow and columnsToGrow, a positive number indicates to the right/down, and a negative number indicates to the left/up
    // const tile = this.get(tileRow, tileColumn);

    // this.removeTile(tile);

    let smallestRow = tileRow;
    let smallestColumn = tileColumn;

    if (rowsToGrow < 0) {
      smallestRow += rowsToGrow;
    }

    if (columnsToGrow < 0) {
      smallestColumn += columnsToGrow;
    }
    
    tile.grow();
    console.log('boardjs 120 - smallestRow, smallestColumn', smallestRow, smallestColumn);
    this.set(tile, smallestRow, smallestColumn);

  }

  shrinkTile(tile, tileRow, tileColumn, rowsToShrink, columnsToShrink) {
    console.log('boardjs 129 - tileRow, tileColumn', tileRow, tileColumn)
    console.log('boardjs 130 - rowsToShrink, columnsToShrink', rowsToShrink, columnsToShrink)
    // for rowsToShrink and columnsToShrink, a positive number indicates shrinking to the right/down, and a negative number indicates to the left/up
    // for now we'll assume that only the sign of rowsToShrink and columnsToShrink matter

    // const tile = this.get(tileRow, tileColumn);

    // this.removeTile(tile);

    if (rowsToShrink > 0) {
      tileRow += rowsToShrink;
    }

    if (columnsToShrink > 0) {
      tileColumn += columnsToShrink;
    }

    tile.shrink();
    this.set(tile, tileRow, tileColumn);

  }

  handleBigTileChange(newBigTileRow, newBigTileColumn) {
    console.log('board at beginning', this.storage[0][2]);
    const sizeOfBigTile = this.sizeOfBigTile;
    const newBigTile = this.get(newBigTileRow, newBigTileColumn);
    const oldBigTile = this.getbigTile();
    const { row: oldBigTileRow, column: oldBigTileColumn } = this.getTileCoordinates(oldBigTile);

    // a positive number means shifting tiles to the right
    // a negative number means shifting tiles to the left
    let colShiftDirection = ((oldBigTileColumn - newBigTileColumn) > 0) ? 1 : -1;
    console.log('boardjs - colShiftDirection', colShiftDirection)
    let rowShiftDirection = (newBigTileRow === 0) ? 1 : -1;
    console.log('boardjs - rowShiftDirection', rowShiftDirection);

    console.log('board at line167', this.storage[0][2]);
    this.removeTile(oldBigTile);
    console.log('board at line169', this.storage[0][2]);
    this.removeTile(newBigTile);
    console.log('board at line171', this.storage[0][2]);

    
    console.log(this.storage);
    let startingIndex;
    let endingIndex;

    if (colShiftDirection > 0) {
      startingIndex = newBigTileColumn;
      endingIndex = oldBigTileColumn + 1;
    } else if (colShiftDirection < 0) {
      startingIndex = oldBigTileColumn;
      endingIndex = newBigTileColumn;
    }

    console.log('boardjs starting ending', startingIndex, endingIndex);
    for (let i = 0; i < this.rows; i++) {
      let isSameRowAsGrower = i === newBigTileRow;
      console.log('about to shift row i, units', i, sizeOfBigTile, isSameRowAsGrower)
      this.shiftRow(i, startingIndex, endingIndex, (sizeOfBigTile - isSameRowAsGrower) * colShiftDirection );
    }

    // this.set(newBigTile, newBigTileRow, newBigTileColumn)
    // this.set(oldBigTile, oldBigTileRow, oldBigTileColumn);

    this.growTile(newBigTile, newBigTileRow, newBigTileColumn, (sizeOfBigTile - 1) * rowShiftDirection, (sizeOfBigTile - 1) * colShiftDirection);

    this.shrinkTile(oldBigTile, oldBigTileRow, oldBigTileColumn, (sizeOfBigTile - 1) * rowShiftDirection * -1, (sizeOfBigTile - 1) * colShiftDirection);

    // the ones that should shift are based on being on the shrink-side of the newBigTile
    // if the colsToGrowAndShrink are positive, that means we are shifting RIGHT (positive)
    // if it is negative, that means we are shifting LEFT (negative)
    // the row the new big one is on should shift by one less than the bigsize
    // all other rows should shift by 
    console.log('boardatend', this.storage[0][2]);
  }
}

module.exports = {
  Board
}