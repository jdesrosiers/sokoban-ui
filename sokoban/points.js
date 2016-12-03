define(["sokoban/point"], function (Point) {
  return function (coordinates, inverse) {
    result = {};
    coordinates = _.tail(coordinates);

    while (coordinates.length > 0) {
      var pair = _.take(coordinates, 2);
      result[Point.fromPair(pair, inverse)] = true;
      coordinates = _.drop(coordinates, 2);
    }

    return result;
  };
});
