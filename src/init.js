const $ = require('jQuery');
const { Board } = require('./models/Board.js');

function init() {
  const board = new Board(2, 6, 2);

  console.log('init!')
  
  window.board = board;
}

module.exports = {
  init
}