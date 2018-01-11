const $ = require('jQuery');

const { styleConfig } = require('./styleConfig.js');
const { colors, characters } = require('./tileDesignBank');

class TileView {
  constructor(name, isBig, boardNo, controllers) {
    const { tileSide, margin, outerMargin } = styleConfig;
    const { handleBigTileChange } = controllers;
    const imageUrl = characters[name];

    this.name = name;

    this.tileStyle = {
      width: tileSide,
      height: tileSide,
    }

    this.staticStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundColor: 'transparent'
    }

    this.$el = $('<div></div>')
      .addClass('tile')
      .attr('id', this.name)
      .css(this.tileStyle)
      .css(this.staticStyle)
      .appendTo(`#board${boardNo}`)
      .on('mouseenter', (e) => {
        handleBigTileChange(e.target.id);
      });
  }

  move(coords) {

    const options = {
      queue: false,
      duration: 800
    }

    this.$el.animate(coords, options);
  }

  render(isBig) {
    const { tileSide, margin, outerMargin } = styleConfig;

    if (isBig) {
      console.log('colors', colors)
      let ranNum = Math.floor(Math.random() * colors.length)
      console.log('rannum', ranNum);
      let color = colors[ranNum];
      console.log('color', color);

      console.log('color', color);
      this.tileStyle.width = this.tileStyle.width * 2 + margin;
      this.tileStyle.height = this.tileStyle.height * 2 + margin;
      this.staticStyle.backgroundColor = color;
    } else {
      this.tileStyle.width = (this.tileStyle.width - margin) / 2;
      this.tileStyle.height = (this.tileStyle.height - margin) / 2;
      this.staticStyle.backgroundColor = 'transparent';
    }

    if (isBig) {
      this.$el.css('z-index', 1);

      setTimeout(() => {
        this.$el.css('z-index', 0)
      }, 801);
    }
    
    const options = {
      queue: false,
      duration: 400
    }

    console.log('this.tilestyle', this.tileStyle);
     
    this.$el.css(this.staticStyle);
    this.$el.animate(this.tileStyle, options);
  }
}

module.exports = {
  TileView
}