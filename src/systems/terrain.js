
var _ = require('lodash');
var Entity = require('../base/entity.js');
var Terrain = require('../components/terrain.js');
var Arable = require('../components/arable.js');
var Spring = require('../components/spring.js');
var Position = require('../components/position.js');
var Sprite = require('../components/sprite.js');
var pairing = require('../helpers/pairing.js');
var random = require('../base/random.js');
var tiles = {};

// terrain types to randomly generate
var terrainTypes = [
  {
    terrain: { type: 'soil' },
    sprite: { frameset: 'tile-soil' },
    arable: {
      light: [50, 50],
      water: [20, 80],
      nutrients: [60, 100]
    }
  },
  {
    terrain: { type: 'spring' },
    sprite: { frameset: 'tile-water' },
    spring: {
      water_power: 5,
      water_range: 1
    }
  }
];

function update() {
  Terrain.each(function (terrain) {
    var entity = terrain.entity;
    var position = Position.get(entity.id);
    var x = position.x;
    var y = position.y;
    var pos = pairing(x, y);
    if (!position) return;

    if (entity.destroyed && tiles[pos] === entity) {
      tiles[pos] = null;
      return;
    }

    if (tiles[pos] !== entity) {
      tiles[pos] = entity;
    }
  });
}

function get(x, y) {
  return tiles[pairing(x, y)];
}

function generate(cols, rows) {
  for (var x = 0; x < cols; x++) {
    for (var y = 0; y < rows; y++) {
      var sample = random.int(0, terrainTypes.length); // always soil for now
      var type = terrainTypes[sample];

      var entity = new Entity();
      entity.set(Terrain, type.terrain);
      entity.set(Position, {x: x, y: y});
      generateArable(entity, type.arable);
      generateSpring(entity, type.spring);
      generateSprite(entity, type.sprite);
    }
  }
}

function generateArable(entity, props) {
  if (!props) return;
  var water = random.int(props.water[0], props.water[1]);
  var nutrients = random.int(props.nutrients[0], props.nutrients[1]);
  var light = random.int(props.light[0], props.light[1]);
  return entity.set(Arable, {water: water, nutrients: nutrients, light: light});
}

function generateSpring(entity, props) {
  if (!props) return;
  return entity.set(Spring, {
    water_power: props.water_power,
    water_range: props.water_range
  });
}

function generateSprite(entity, props) {
  if (!props) return;
  return entity.set(Sprite, {layer: 0, frameset: props.frameset});
}

function arable(x, y) {
  var arable = Arable.get(get(x, y));
  return arable && !arable.planted;
}

function plant(entity, x, y) {
  var tile = get(x, y);
  var arable = Arable.get(tile.id);
  arable.planted = entity.id;
  return arable;
}

function clear() {
  var tileKeys = _.keys(tiles);
  _.each(tileKeys, function (key) {
    delete tiles[key];
  });
}

module.exports = {
  update: update,
  get: get,
  arable: arable,
  plant: plant,
  generate: generate,
  clear: clear
};
