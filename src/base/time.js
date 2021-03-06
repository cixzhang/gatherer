
var HOUR = 60;
var DAY = HOUR * 24;
var MONTH = DAY * 30; // 4 weeks
var SEASON = MONTH * 2;
var YEAR = SEASON * 4; // 4 seasons

var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'September', 'October'];

function GameTime(time, realtime) {
  this.time = time;
  this.realtime = realtime;
  this.year = Math.floor(time / YEAR);
  this.years = Math.floor(this.time / YEAR);
  time = time - this.year * YEAR;
  this.season = Math.floor(time / SEASON);
  this.seasons = Math.floor(this.time / SEASON);

  this.month = Math.floor(time / MONTH);
  this.months = Math.floor(this.time / MONTH);
  time = time - this.month * MONTH;
  this.day = Math.floor(time / DAY);
  this.days = Math.floor(this.time / DAY);
  time = time - this.day * DAY;
  this.hour = Math.floor(time / HOUR);
  this.hours = Math.floor(this.time / HOUR);
  time = time - this.hour * HOUR;
  this.minute = Math.floor(time);
  this.minutes = Math.floor(this.time);
  return this;
}

GameTime.prototype = {};
GameTime.prototype.toString = function () {
  if (!this.string) {
    var stringSet = [];
    var dayOfWeek = DAY_NAMES[Math.floor((this.time / DAY) % 7)];
    stringSet.push('Year ' + this.year + ',');
    stringSet.push(dayOfWeek);
    stringSet.push(MONTH_NAMES[this.month]);
    stringSet.push(this.day);
    stringSet.push(this.hour + ':' + this.minute);
    this.string = stringSet.join(' ');
  }
  return this.string;
};


// Static methods
var paused = true;
var gametime;

GameTime.MINUTE = 12; // 1.2 sec per minute

GameTime.start = function (realtime) {
  GameTime.unpause();
  return GameTime.update(realtime);
};

GameTime.pause = function() {
  paused = true;
};

GameTime.unpause = function() {
  paused = false;
};

GameTime.update = function(realtime) {
  realtime = realtime || Date.now();

  var current = GameTime.now();
  var elapsed = 0;
  var time = 0;

  if (current) {
    elapsed = (realtime - current.realtime) / GameTime.MINUTE;
    time = paused ? current.time : current.time + elapsed;
  }

  return GameTime.set(time, realtime);
};

GameTime.set = function (time, realtime) {
  realtime = realtime || Date.now();
  gametime = new GameTime(time, realtime);
  return gametime;
};

GameTime.now = function () {
  return gametime;
};

module.exports = GameTime;
