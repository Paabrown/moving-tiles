const { TileView } = require('../views/TileView.js');

class Tile {
  constructor(name, isBig, boardNo, controllers) {
    this.name = name;
    this.isBig = isBig;

    this.view = new TileView(name, isBig, boardNo, controllers);
  }

  grow() {
    if (this.isBig) {
      throw new Error('Error! Trying to grow a tile that already claims to be big!');
    }

    this.isBig = true;

    this.view.render(this.isBig);
  }

  shrink() {
    if (!this.isBig) {
      throw new Error('Error! Trying to shrink a tile that already claims to be small!');
    }

    this.isBig = false;

    this.view.render(this.isBig);
  }
}

module.exports = {
  Tile
}