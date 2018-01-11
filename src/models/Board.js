const { BoardView } = require('../views/BoardView.js');
const { populateStorage, checkForConstructionErrors } = require('./board-constructor-helpers');

class Board {
  constructor(rows, columns, sizeOfBigTile, boardNo, finalBoardNo, currentCharInd) { 
    this.sizeOfBigTile = sizeOfBigTile;
    this.boardNo = boardNo;
    this.view = new BoardView(rows, columns, boardNo, finalBoardNo);
    this.storage = new Array(rows).fill(null).map(row => {
      return new Array(columns).fill(null);
    });
    this.controllers = {
      handleBigTileChange: this.handleBigTileChange.bind(this)
    }
    
    checkForConstructionErrors(rows, columns, sizeOfBigTile);
    populateStorage(this, currentCharInd, this.controllers);
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

  getTileCoordinates(tileObj, tileName) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const currentTile = this.get(i , j);

        if (currentTile === tileObj || (currentTile && currentTile.name === tileName)) {
          return {
            tile: currentTile,
            row: i,
            column: j
          }
        }
      }
    }
  }

  set(tile, row, column) {
    this.storage[row][column] = tile;

    if (tile) {
      this.view.renderTileMove(tile, row, column);
    }
  }

  get(row, column) {
    return this.storage[row][column];
  }

  removeTile(tileObj) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const currentTile = this.get(i , j);
        
        if (currentTile === tileObj) {
          this.set(null, i, j);
        }
      }
    }
  }

  shiftRow(rowIndex, startingIndex, endingIndex, units) {
    // positive units is shifting right, negative is shifting left
    const rowCopy = this.storage[rowIndex].slice();

    for (let j = startingIndex; j <= endingIndex; j++) {
      let indOfTileToInsert = j - units;
      // don't grab the tile if it's not in the range of tiles shifted
      let tileToInsert = (indOfTileToInsert >= startingIndex && indOfTileToInsert <= endingIndex) ? rowCopy[indOfTileToInsert] : null;
      this.set(tileToInsert, rowIndex, j);
    }

    return this.storage[rowIndex];
  }

  triggerTileGrow(tile, tileRow, tileColumn, rowsToGrow, columnsToGrow) {
    // a positive number indicates to the right/down, and a negative number indicates to the left/up
    let smallestRow = tileRow;
    let smallestColumn = tileColumn;

    if (rowsToGrow < 0) {
      smallestRow += rowsToGrow;
    }

    if (columnsToGrow < 0) {
      smallestColumn += columnsToGrow;
    }
    
    tile.grow();
    this.set(tile, smallestRow, smallestColumn);
  }

  triggerTileShrink(tile, tileRow, tileColumn, rowsToShrink, columnsToShrink) {
    // for rowsToShrink and columnsToShrink, a positive number indicates shrinking to the right/down, and a negative number indicates to the left/up

    if (rowsToShrink > 0) {
      tileRow += rowsToShrink;
    }

    if (columnsToShrink > 0) {
      tileColumn += columnsToShrink;
    }

    tile.shrink();
    this.set(tile, tileRow, tileColumn);

  }

  handleBigTileChange(tileName) {
    // coordinates board changes when user causes the big tile to change
    const { tile: newBigTile, row: newBigTileRow, column: newBigTileColumn} = this.getTileCoordinates({}, tileName);
    
    if (newBigTile.isBig) {
      return;
    }

    const sizeOfBigTile = this.sizeOfBigTile;
    const oldBigTile = this.getbigTile();
    const { row: oldBigTileRow, column: oldBigTileColumn } = this.getTileCoordinates(oldBigTile);

    let colShiftDirection = ((oldBigTileColumn - newBigTileColumn) > 0) ? 1 : -1;
    let rowShiftDirection = (newBigTileRow === 0) ? 1 : -1;

    this.removeTile(oldBigTile);
    this.removeTile(newBigTile);
    
    let startingIndex;
    let endingIndex;

    if (colShiftDirection > 0) {
      startingIndex = newBigTileColumn;
      endingIndex = oldBigTileColumn + 1;
    } else if (colShiftDirection < 0) {
      startingIndex = oldBigTileColumn;
      endingIndex = newBigTileColumn;
    }

    for (let i = 0; i < this.rows; i++) {
      let isSameRowAsGrower = i === newBigTileRow;
      this.shiftRow(i, startingIndex, endingIndex, (sizeOfBigTile - isSameRowAsGrower) * colShiftDirection );
    }

    this.triggerTileGrow(newBigTile, newBigTileRow, newBigTileColumn, (sizeOfBigTile - 1) * rowShiftDirection, (sizeOfBigTile - 1) * colShiftDirection);

    this.triggerTileShrink(oldBigTile, oldBigTileRow, oldBigTileColumn, (sizeOfBigTile - 1) * rowShiftDirection * -1, (sizeOfBigTile - 1) * colShiftDirection);
  }
}

module.exports = {
  Board
}