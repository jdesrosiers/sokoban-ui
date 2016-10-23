define(function () {
  var Point = _.memoize(function (x, y) {
    var POINT = {};

    var move = {
      "R": function () { return Point(x + 1, y); },
      "L": function () { return Point(x - 1, y); },
      "U": function () { return Point(x, y - 1); },
      "D": function () { return Point(x, y + 1); }
    };

    POINT.move = function (direction) {
      return move[direction]();
    };

    POINT.getX = function () {
      return x;
    };

    POINT.getY = function () {
      return y;
    };

    POINT.toString = function () {
      return [x, y].join(" ");
    };

    return POINT;
  }, function (x, y) { return x + " " + y });

  Point.fromPair = function (pair) {
    return Point(parseInt(pair[0]), parseInt(pair[1]));
  };

  Point.fromString = function (str) {
    return Point.fromPair(str.split(" "));
  };

  return Point;

});
