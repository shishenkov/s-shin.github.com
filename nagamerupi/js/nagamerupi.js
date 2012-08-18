// Generated by CoffeeScript 1.3.3
(function() {
  var NagameruPi;

  NagameruPi = (function() {

    function NagameruPi(separatorWidth) {
      var _this = this;
      this.separatorWidth = separatorWidth != null ? separatorWidth : 1;
      this.win = $(window);
      this.doc = $(document);
      this.content = $("#content");
      this.content.empty();
      this.pi = new SpigotPi(function(v) {
        return _this.update(v);
      });
      this.isFirst = true;
      this.setContentWidth(50);
      this.scrollable = true;
      this.stopped = false;
      this.speed = 300;
    }

    NagameruPi.prototype.update = function(s) {
      var d, span,
        _this = this;
      span = $("<span>").html(s).hide().fadeIn(this.speed, function() {
        if (_this.isFirst) {
          _this.isFirst = false;
          return _this.update(".<br />");
        } else if (!_this.stopped) {
          return _this.pi.step();
        }
      });
      this.content.append(span);
      d = this.pi.digits();
      if (d > 1) {
        span.attr("data-digits", d);
        if (d % 10 === 0) {
          span.addClass("d10");
        }
        if (d % 50 === 0) {
          span.addClass("d50");
        }
        if (d % this.numX === 0) {
          return this.scrollable = this.doc.height() <= this.win.height() + this.win.scrollTop();
        } else if (d % this.numX === 2 && this.scrollable) {
          return $.scrollTo(this.doc.height(), 500);
        }
      }
    };

    NagameruPi.prototype.start = function() {
      this.stopped = false;
      return this.pi.step();
    };

    NagameruPi.prototype.stop = function() {
      return this.stopped = true;
    };

    NagameruPi.prototype.setContentWidth = function(numX) {
      this.numX = numX;
      return this.updateContentWidth();
    };

    NagameruPi.prototype.updateContentWidth = function() {
      var letterWidth;
      letterWidth = this.content.find("span:eq(0)").width();
      return this.content.width(letterWidth * this.numX + this.separatorWidth * Math.ceil(this.numX / 10));
    };

    return NagameruPi;

  })();

  $(function() {
    var content, np;
    content = $("#content");
    np = new NagameruPi;
    np.start();
    (function() {
      var config, playStop;
      playStop = $("header nav .playStop");
      playStop.click(function() {
        if (playStop.hasClass("playing")) {
          np.stop();
        } else {
          np.start();
        }
        return playStop.toggleClass("playing");
      });
      config = $("header nav .config");
      return config.click(function() {
        return $("header div.configArea").toggle(500);
      });
    })();
    (function() {
      var resize, target, value;
      target = $("header div.configArea section.width div");
      value = $("header div.configArea section.width h1 span");
      resize = function(v) {
        np.setContentWidth(v);
        return value.text(v);
      };
      target.slider({
        min: 40,
        max: 60,
        value: 50,
        slide: function(ev, ui) {
          return resize(ui.value);
        }
      });
      return resize(target.slider("value"));
    })();
    (function() {
      var change, target;
      target = $("header div.configArea section.font input");
      change = function(f, s) {
        content.css({
          "font-family": f,
          "font-size": s
        });
        return np.updateContentWidth();
      };
      target.eq(0).val(content.css("font-family"));
      target.eq(1).val(content.css("font-size"));
      target.blur(function() {
        return change(target.eq(0).val(), target.eq(1).val());
      });
      return target.keypress(function(e) {
        if (e.which === 13) {
          return change(target.eq(0).val(), target.eq(1).val());
        }
      });
    })();
    return (function() {
      var target;
      target = $("header div.configArea section.guide input");
      return target.click(function() {
        return content.toggleClass("guide");
      });
    })();
  });

}).call(this);