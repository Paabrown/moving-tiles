const { styleConfig } = require('./styleConfig.js');
const $ = require('jQuery');

class BoardView {
  constructor(rows, columns) {
    const { tileSide, margin, outerMargin } = styleConfig;

    this.boardStyle = {
      width: (tileSide + margin) * columns + margin + 'px',
      height: (tileSide + margin) * rows + margin + 'px',
      left: outerMargin + 'px',
      top: outerMargin + 'px'
    }

    this.styleConfig = styleConfig;
    this.$el = $('#board').css(this.boardStyle);
  }

  renderTileMove(tile, row, column) {
    const coords = this.getTileSlotCoords(row, column);

    tile.view.$el.animate(coords);
  }

  getTileSlotCoords(row, column) {
    const { tileSide, margin, outerMargin } = styleConfig;

    return {
      left: outerMargin + (tileSide + margin) * column + margin + 'px',
      top: outerMargin + (tileSide + margin) * row + margin + 'px'
    }
  }
}

module.exports = {
  BoardView
}