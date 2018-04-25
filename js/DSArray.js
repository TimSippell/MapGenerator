var mapGen = (function mapGenerator() {
  "use strict";

  function generate(size, seed, roughness, normalFactor) {
    if (!size) size = 65;
    if (!seed) seed = size / 2;
    if (!roughness) roughness = seed / 2;
    if (!normalFactor) normalFactor = roughness / 2;

    var terrain = makeEmptyArray(size, size);

    terrain[0][0] = randomNumber() * seed;
    terrain[size - 1][0] = randomNumber() * seed;
    terrain[0][size - 1] = randomNumber() * seed;
    terrain[size - 1][size - 1] = randomNumber() * seed;

    for (var sideLength = size - 1; sideLength >= 2; sideLength /= 2, roughness /= 2) {
      terrain = square(terrain, sideLength);
      terrain = diamond(terrain, sideLength);
    }

    if (normalFactor >= 1) {
      terrain = normalizeArray(terrain, normalFactor);
    }

    terrain = expandArray(terrain);

    return terrain;

    function makeEmptyArray(w, h) {
      var array = new Array(w), i = 0, j = 0;
      for ( i = 0; i < w; i++) {
        array[i] = new Array(h);
        for ( j = 0; j < h; j++) {
          array[i][j] = 0;
        }
      }
      return array;
    }

    function square(input, sideLength) {
      var i = 0, j = 0
      for ( i = 0; i < size - 1; i += sideLength) {
        for ( j = 0; j < size - 1; j += sideLength) {
          var avg = input[i][j] + input[i + sideLength][j] + input[i][j + sideLength] + input[i + sideLength][j + sideLength];

          avg /= 4;
          input[i + (sideLength / 2)][j + (sideLength / 2)] = (avg + (randomNumber() * roughness * 2 - roughness));

        }
      }
      return input;
    }

    function diamond(input, sideLength) {
      var i = 0, j = 0
      for ( i = 0; i < size - 1; i += sideLength / 2) {
        for ( j = (i + sideLength / 2) % sideLength; j < size - 1; j += sideLength) {
          var avg = input[(i - sideLength / 2 + (size - 1)) % (size - 1)][j] + input[(i + sideLength / 2) % (size - 1)][j] + input[i][(j + sideLength / 2) % (size - 1)] + input[i][(j - sideLength / 2 + (size - 1)) % (size - 1)];

          avg /= 4;
          input[i][j] = (avg + (randomNumber() * roughness * 2 - roughness));

          if (i === 0) {
            input[size - 1][j] = avg;
          }
          if (j === 0) {
            input[i][size - 1] = avg;
          }

        }
      }
      return input;
    }

    function normalizeArray(input, factor) {
      var max = -100 * seed, min = 100 * seed, i = 0, j = 0;

      for ( i = 0; i < size; i++) {
        for ( j = 0; j < size; j++) {
          if (input[i][j] < min) {
            min = input[i][j];
          }
          if (input[i][j] > max) {
            max = input[i][j];
          }
        }
      }

      for ( i = 0; i < size; i++) {
        for ( j = 0; j < size; j++) {
          if (Math.abs(min) > Math.abs(max)) {
            input[i][j] = input[i][j] / min * factor;
          } else {
            input[i][j] = input[i][j] / max * factor;
          }
        }
      }

      input[0][0] = (input[0][1] + input[1][0]) / 2;
      input[size - 1][0] = (input[size - 2][0] + input[size - 1][1]) / 2;
      input[0][size - 1] = (input[0][size - 2] + input[1][size - 1]) / 2;
      input[size - 1][size - 1] = (input[size - 2][size - 1] + input[size - 1][size - 2]) / 2;

      return input;
    }

    function expandArray(input, colorStyle) {
      var output = [], i = 0;
      for ( i = 0; i < input.length; i++) {
        output = output.concat(input[i]);
      }
      return output;
    }

    function randomNumber() {
      return Math.random();
    }

    function nearestPow2(size) {
      return Math.pow(2, Math.round(Math.log(size) / Math.log(2)));
    }
  }
  var publicAPI = {
    generate: generate
  };
  return publicAPI;
})();
