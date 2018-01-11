const $ = require('jQuery');
const { App } = require('./models/App.js');

function init() {
  const app = new App(2);
  
  window.App = App;
}

module.exports = {
  init
}