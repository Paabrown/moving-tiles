const $ = require('jQuery');
const { App } = require('./models/App.js');

function init() {
  new App(2);
}

module.exports = {
  init
}