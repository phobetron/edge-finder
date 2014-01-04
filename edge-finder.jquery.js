(function($) {
  $.fn.EdgeFinder = function(side, options) {
    var edgeFinder = [];

    var settings = {
      rgba: [0,0,0,0],
      exclude: []
    }

    if (options) { settings = $.extend(settings, options); }

    var merge = function(a, b) {
      for (i = 0; i < b.length; i++) { a.push(b[i]); }
      return a;
    }

    var compare = function(a, b) {
      if (a.length != b.length) { return false; }
      for (var i = 0; i < b.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }

    var exclude = function(p) {
      for (var i = 0; i < settings.exclude.length; i++) {
        var box = settings.exclude[i];
        if ((p.x > box[0].x && p.x < box[1].x) && (p.y > box[0].y && p.y < box[1].y)) return true;
      }
      return false;
    }

    var edger = function(o_rgba, _rgba, direction) {
        var left = !compare(_rgba, settings.rgba) && compare(o_rgba, settings.rgba);
        var right = compare(_rgba, settings.rgba) && !compare(o_rgba, settings.rgba);

        var isEdge = false;
        switch(direction) {
          case "left": isEdge = left; break;
          case "right": isEdge = right; break;
          default: isEdge = (left || right);
        }
        return isEdge;
    }

    var vertical = function(direction, image) {
      var data = image.data;
      var edges = [];
      var o_rgba = settings.rgba.slice(0);

      for (var x = 0; x < image.width; x++) {
        for (var y = 0; y < image.height; y++) {
          var pt = (x+y*image.width)*4;
          var _rgba = [data[pt], data[pt+1], data[pt+2], data[pt+3]];

          var p = { y: y, x: x };
          if (!exclude(p) && edger(o_rgba, _rgba, direction)) {
            edges.push(p);
          }

          o_rgba = _rgba;
        }
      }

      return edges;
    }

    var horizontal = function(direction, image) {
      var data = image.data;
      var edges = [];
      var o_rgba = settings.rgba.slice(0);

      for (var i = 0; i < image.data.length; i+=4) {
        var _rgba = [data[i], data[i+1], data[i+2], data[i+3]];

        var p = { y: Math.round((i/4)/image.width), x: (i/4)%image.width };
        if (!exclude(p) && edger(o_rgba, _rgba, direction)) {
          edges.push(p);
        }

        o_rgba = _rgba;
      }

      return edges;
    }

    var methods = {
      topEdge: function(image) { return vertical("left", image); },
      bottomEdge: function(image) { return vertical("right", image); },
      verticalEdge: function(image) { return vertical(null, image); },

      leftEdge: function(image) { return horizontal("left", image); },
      rightEdge: function(image) { return horizontal("right", image); },
      horizontalEdge: function(image) { return horizontal(null, image); },

      entireEdge: function(image) { return merge(horizontal(null, image), vertical(null, image)); }
    }

    this.each(function(i) {
      if (methods[side+"Edge"]) {
        var image = {
          width: this.width,
          height: this.height
        }

        var canvas = document.createElement("canvas");
            canvas.setAttribute("width", image.width);
            canvas.setAttribute("height", image.height);

        var c = canvas.getContext("2d");
            c.drawImage(this, 0, 0, image.width, image.height);

        var imageData = c.getImageData(0, 0, image.width, image.height);
        image["data"] = imageData.data;

        var edges = methods[side+"Edge"].apply(this, [image]);
        edgeFinder.push(edges);
      }
      else { $.error("That is not a valid edge."); }
    });

    return edgeFinder;
  }
})(jQuery);
