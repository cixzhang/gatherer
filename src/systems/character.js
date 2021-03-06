var Entity = require('../base/entity.js');
var Position = require('../components/position.js');
var Movable = require('../components/movable.js');
var Sprite = require('../components/sprite.js');

function Character(x, y) {
  var character = new Entity();
  character.set(Movable, {speed: 2});
  character.set(Position, {x: x, y: y});
  character.set(Sprite, {frameset: 'char-0', layer: 2});

  return character;
}

module.exports = Character;
