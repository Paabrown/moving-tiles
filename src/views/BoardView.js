const { styleConfig } = require('./styleConfig.js');
const $ = require('jquery');

class BoardView {
  constructor(rows, columns, boardNo, finalBoardNo) {
    const { tileSide, margin } = styleConfig;

    this.boardStyle = {
      width: (tileSide + margin) * columns + margin + 'px',
      height: (tileSide + margin) * rows + ((boardNo === finalBoardNo) ? margin : 0) + 'px',
    }
    this.$el = $('<div></div>').attr('id', 'board' + boardNo).addClass('board').css(this.boardStyle).appendTo('#app');

    renderTileSlots(this, rows, columns, tileSide, margin)

    function renderTileSlots(board, rows, columns, tileSide, margin) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          const styling = board.getTileSlotCoords(i, j);
          styling.width = tileSide;
          styling.height = tileSide;

          $('<div></div>')
            .addClass('tileSlot')
            .css(styling)
            .appendTo(`#board${boardNo}`);
        }
      }
    }

  }

  renderTileMove(tile, row, column) {
    const coords = this.getTileSlotCoords(row, column);

    tile.view.move(coords);
  }

  getTileSlotCoords(row, column) {
    const { tileSide, margin } = styleConfig;

    return {
      left: (tileSide + margin) * column + margin + 'px',
      top:  (tileSide + margin) * row + margin + 'px'
    }
  }
}

module.exports = {
  BoardView
}