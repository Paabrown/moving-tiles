const colors = ['#4292f4', '#d341f4', '#e3ff0f', '#0fffd3', '#0fff93'];

const names = ['biggie', 'bird', 'bulb', 'cater', 'char', 'nido', 'pidgey', 'pika', 'rat', 'sand', 'snake', 'squirtle', 'weedle'];

const characters = {};

names.forEach(name => {
  characters[name] = `assets/${name}.png`
})

console.log(characters);

module.exports = {
  colors,
  characters,
  names
}