const $ = require('jQuery');
const { styleConfig } = require('./styleConfig.js');
const { colors, characters } = require('./tileDesignBank');

class TileView {
  constructor(name, isBig) {
    const { tileSide, margin, outerMargin } = styleConfig;
    const imageUrl = characters[name];
    console.log('imageUrl', imageUrl);

    this.name = name;
    this.tileStyle = {
      width: tileSide,
      height: tileSide,
      backgroundImage: `url(${imageUrl})`
    }

    this.$el = $('<div></div>').addClass('tile').attr('id', this.name).css(this.tileStyle).appendTo('#board');
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
     
    this.$el.animate(this.tileStyle);
  }
}

module.exports = {
  TileView
}