define(["sokoban/point", "sokoban/points"], function (Point, points) {
  var Game = function (size, walls, storage) {
    var GAME = {};

    GAME.getSize = function () {
      return size;
    }

    GAME.isWall = function (x, y) {
      return walls[Point(x, y)] === true;
    };

    GAME.isStorage = function (x, y) {
      return storage[Point(x, y)] === true;
    };

    GAME.canMove = function (state, direction) {
      var destination = state.getPlayer().move(direction);
      if (walls[destination]) {
        return false;
      }

      if (state.isBox(destination.getX(), destination.getY())) {
        var boxDestination = destination.move(direction);
        if (walls[boxDestination] || state.isBox(boxDestination.getX(), boxDestination.getY())) {
          return false;
        }
      }

      return true;
    };

    GAME.allowedMoves = function (state) {
      return _.filter(["R", "L", "U", "D"], function (direction) {
        return GAME.canMove(state, direction);
      });
    };

    return GAME;
  };

  Game.factory = function (size, walls, storage, inverse) {
    size = Point.fromPair(size.split(" "));
    walls = points(walls.split(" "), inverse);
    storage = points(storage.split(" "), inverse);

    return Game(size, walls, storage);
  };

  return Game;
});

