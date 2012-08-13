// Generated by CoffeeScript 1.3.3
(function() {
  var CELL_HEIGHT, CELL_NUM, CELL_NUM_X, CELL_NUM_Y, CELL_WIDTH, FIELD_HEIGHT, FIELD_WIDTH, FIELD_X, FIELD_Y, FPS, GameMain, GameOver, HEIGHT, Scene, Start, WIDTH, framework,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  framework = $.processing.framework;

  Scene = framework.Scene;

  WIDTH = 400;

  HEIGHT = 300;

  FPS = 30;

  CELL_WIDTH = 10;

  CELL_HEIGHT = 10;

  CELL_NUM_X = WIDTH / CELL_WIDTH;

  CELL_NUM_Y = HEIGHT / CELL_HEIGHT;

  CELL_NUM = CELL_NUM_X * CELL_NUM_Y;

  FIELD_X = 0;

  FIELD_Y = 0;

  FIELD_WIDTH = WIDTH;

  FIELD_HEIGHT = HEIGHT;

  Start = (function(_super) {

    __extends(Start, _super);

    function Start() {
      return Start.__super__.constructor.apply(this, arguments);
    }

    Start.prototype.setup = function(p) {
      p.frameRate(FPS);
      p.size(WIDTH, HEIGHT);
      return new GameMain;
    };

    return Start;

  })(framework.Scene);

  GameMain = (function(_super) {

    __extends(GameMain, _super);

    function GameMain() {
      return GameMain.__super__.constructor.apply(this, arguments);
    }

    GameMain.prototype.setup = function(p) {
      this.state = new logic.State;
      this.field = new logic.Field(CELL_NUM_X, CELL_NUM_Y, this.state);
      return false;
    };

    GameMain.prototype.update = function(p) {
      var DIR, dirs, i, keys, _i, _ref;
      keys = [p.UP, p.RIGHT, p.DOWN, p.LEFT];
      DIR = logic.DIRECTION;
      dirs = [DIR.UP, DIR.RIGHT, DIR.DOWN, DIR.LEFT];
      for (i = _i = 0, _ref = keys.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (framework.key.isPressed(keys[i])) {
          this.field.snake.direct(dirs[i]);
        }
      }
      if (p.frameCount % (FPS / 10) === 0) {
        this.field.update();
        if (this.state.isEnd) {
          return new GameOver;
        }
      }
      return false;
    };

    GameMain.prototype.draw = function(p) {
      var b, _i, _len, _ref;
      p.background(255);
      _ref = this.field.snake.body;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        p.noStroke();
        if (b === this.field.snake.head()) {
          p.fill(0);
        } else {
          p.fill(100);
        }
        this.drawCell(p, b);
      }
      p.fill(0, 0, 255);
      this.drawCell(p, this.field.food);
      return false;
    };

    GameMain.prototype.drawCell = function(p, pos) {
      return p.rect(pos.x * CELL_WIDTH, pos.y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
    };

    return GameMain;

  })(framework.Scene);

  GameOver = (function(_super) {

    __extends(GameOver, _super);

    function GameOver() {
      return GameOver.__super__.constructor.apply(this, arguments);
    }

    GameOver.prototype.update = function(p) {
      if (framework.key.isPressed(" ")) {
        return new GameMain;
      }
      return false;
    };

    GameOver.prototype.draw = function(p) {
      var s, w;
      p.background(255);
      p.fill(255, 0, 0);
      p.textFont("Arial", 20);
      s = "Game Over";
      w = p.textWidth(s);
      p.text(s, (WIDTH - w) / 2, HEIGHT / 2);
      p.textFont("Arial", 13);
      s = "Press space key to restart";
      w = p.textWidth(s);
      p.text(s, (WIDTH - w) / 2, HEIGHT / 2 + 30);
      return false;
    };

    return GameOver;

  })(framework.Scene);

  (typeof exports !== "undefined" && exports !== null ? exports : this).scene = {
    Start: Start
  };

}).call(this);
