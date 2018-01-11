const colors = ['#4292f4', '#d341f4', '#e3ff0f', '#0fffd3', '#0fff93'];

const names = [
  'biggie',
  'bird',
  'bulb',
  'cater',
  'char',
  'nido',
  'pidgey',
  'pika',
  'rat',
  'squirtle',
  'oddish',
  'venom',
  'psyduck',
  'sand',
  'snake',
  'weedle',
  'diglett',
  'meowth'];

const characters = {};

names.forEach(name => {
  characters[name] = `assets/${name}.png`;
});

module.exports = {
  colors,
  characters,
  names
}