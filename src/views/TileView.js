const $ = require('jQuery');
const { styleConfig } = require('./styleConfig.js');
const { colors, characters } = require('./tileDesignBank');

class TileView {
  constructor(name, isBig, controllers) {
    const { tileSide, margin, outerMargin } = styleConfig;
    const { handleBigTileChange } = controllers;
    const imageUrl = characters[name];

    this.name = name;

    this.tileStyle = {
      width: tileSide,
      height: tileSide,
      backgroundImage: `url(${imageUrl})`
    }

    this.$el = $('<div></div>')
      .addClass('tile')
      .attr('id', this.name)
      .css(this.tileStyle)
      .appendTo('#board')
      .on('mouseenter', (e) => {
        handleBigTileChange(e.target.id);
      });
  }

  move(coords) {

    const options = {
      queue: false,
      duration: 800,
    }

    this.$el.animate(coords, options);
  }

  render(isBig) {
    const { tileSide, margin, outerMargin } = styleConfig;

    if (isBig) {
      this.tileStyle.width = this.tileStyle.width * 2 + margin;
      this.tileStyle.height = this.tileStyle.height * 2 + margin;
    } else {
      this.tileStyle.width = (this.tileStyle.width - margin) / 2;
      this.tileStyle.height = (this.tileStyle.height - margin) / 2;
    }

    this.$el.css('z-index', 100);

    const options = {
      queue: false,
      duration: 400,
      complete: () => {
        console.log('zindex1')
        this.$el.css('z-index', 1);
      }
    }
     
    this.$el.animate(this.tileStyle, options);
  }
}

module.exports = {
  TileView
}