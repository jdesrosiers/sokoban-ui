define(["sokoban/point", "sokoban/points"], function (Point, points) {
  var GameState = function (boxes, player) {
    var GAME_STATE = {};

    GAME_STATE.getPlayer = function () {
      return player;
    };

    GAME_STATE.isBox = function (x, y) {
      return boxes[Point(x, y)] === true;
    };

    GAME_STATE.isPlayer = function (x, y) {
      return player == Point(x, y);
    };

    GAME_STATE.move = function (direction) {
      var playerTo = player.move(direction);
      var boxesTo = JSON.parse(JSON.stringify(boxes));

      if (boxes[playerTo]) {
        delete boxesTo[playerTo];
        boxesTo[playerTo.move(direction)] = true;
      }
      return GameState(boxesTo, playerTo);
    };

    return GAME_STATE;
  };

  GameState.factory = function (boxes, player, inverse) {
    player = Point.fromPair(player.split(" "), inverse);
    boxes = points(boxes.split(" "), inverse);

    return GameState(boxes, player);
  };

  return GameState;
});
