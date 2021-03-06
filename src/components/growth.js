
var Component = require('../base/component.js');

var Growth = new Component('growth', {
  stage:   1,
  ticks:   0, // growth ticks (time units alive)
  cycle:   0, // life cycles
  energy:  0, // energy for growth
  max_energy: 100,
  death_ticks: 0, // 5 death ticks mean dead plant
  stage_ticks: 0, // number of ticks in current stage
  last_tick: null,

  // Growth counts
  roots:   0,
  stems:   0,
  leaves:  0,
  flowers: 0,
  seeds:   0,

  // Resource affinities
  // Resources provide affinity/5 energy and are consumed during a tick
  // Not being within 10 of at least 2 affinities adds death ticks
  affinity_light: 50,
  affinity_water: 30,
  affinity_soil:  60,

  tick_rate: 1, // ticks per day (< 1 slower stages, > 1 faster stages)
  stage_rate: 1, // ticks per stage multiplier

  // energy cost for each part, cost is paid during a tick
  cost_root:   2,
  cost_stem:   3,
  cost_leaf:   5,
  cost_flower: 10,
  cost_seed:   8,

  // appearance
  appearance_stem: 0,
  appearance_leaf: 0,

  color_stem: [1, 1, 1, 1],
  color_leaf: [1, 1, 1, 1]
});

module.exports = Growth;
