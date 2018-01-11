const $ = require('jquery');

const { App } = require('./models/App.js');

$(document).ready(() => {
  new App(2);
});