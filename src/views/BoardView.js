const { styleConfig } = require('./styleConfig.js');
const $ = require('jQuery');

class BoardView {
  constructor(rows, columns, boardNo) {
    const { tileSide, margin } = styleConfig;

    this.boardStyle = {
      width: (tileSide + margin) * columns + margin + 'px',
      height: (tileSide + margin) * rows + margin + 'px',
    }

    this.styleConfig = styleConfig;

    this.$el = $('<div></div>').attr('id', 'board' + boardNo).addClass('board').css(this.boardStyle).appendTo('#app');

    this.currentlyAnimating = false;
  }

  renderTileMove(tile, row, column) {
    const coords = this.getTileSlotCoords(row, column);

    tile.view.move(coords)
  }

  getTileSlotCoords(row, column) {
    const { tileSide, margin, outerMargin } = styleConfig;

    return {
      left: (tileSide + margin) * column + margin + 'px',
      top:  (tileSide + margin) * row + margin + 'px'
    }
  }
}

module.exports = {
  BoardView
}