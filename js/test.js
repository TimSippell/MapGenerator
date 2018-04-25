var mapGen = (function MapGen(size, seed, roughness, normalFactor) {
  function generate() {
    var terrain = MakeEmptyArray(size, size);
    console.log(terrain);
    var sideLength = 0;

    terrain[0][0] = RandomNumber() * seed;
    terrain[size - 1][0] = RandomNumber() * seed;
    terrain[0][size - 1] = RandomNumber() * seed;
    terrain[size - 1][size - 1] = RandomNumber() * seed;

    for (sideLength = size - 1; sideLength >= 2; sideLength /= 2, roughness /= 2) {
      terrain = Square(terrain, sideLength);
      terrain = Diamond(terrain, sideLength);
    }

    if (normalFactor >= 1) terrain = NormalizeArray(terrain, normalFactor);
    terrain = ExpandArray(terrain);

    return terrain;
  }

  function MakeEmptyArray(w, h) {
    var array = new Array(w);
    for (i = 0; i < w; i++) {
      array[i] = new Array(h);
      for (j = 0; j < h; j++) {
        array[i][j] = 0;
      }
    }
    return array;
  }

  function Square(input, sideLength) {
    for (var x = 0; x < size - 1; x += sideLength) {
      for (var y = 0; y < size - 1; y += sideLength) {
        var avg = input[x][y] + input[x + sideLength][y] + input[x][y + sideLength] + input[x + sideLength][y + sideLength];

        avg /= 4;
        input[x + (sideLength / 2)][y + (sideLength / 2)] = (avg + (RandomNumber() * roughness * 2 - roughness));

      }
    }
    return input;
  }

  function Diamond(input, sideLength) {
    for (var x = 0; x < size - 1; x += sideLength / 2) {
      for (var y = (x + sideLength / 2) % sideLength; y < size - 1; y += sideLength) {
        var avg = input[(x - sideLength / 2 + (size - 1)) % (size - 1)][y] + input[(x + sideLength / 2) % (size - 1)][y] + input[x][(y + sideLength / 2) % (size - 1)] + input[x][(y - sideLength / 2 + (size - 1)) % (size - 1)];

        avg /= 4;
        input[x][y] = (avg + (RandomNumber() * roughness * 2 - roughness));

        if (x === 0) {
          input[size - 1][y] = avg;
        }
        if (y === 0) {
          input[x][size - 1] = avg;
        }

      }
    }
    return input;
  }

  function NormalizeArray(input, factor) {
    var max = -100 * seed;
    var min = 100 * seed;

    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++) {
        if (input[i][j] < min) {
          min = input[i][j];
        }
        if (input[i][j] > max) {
          max = input[i][j];
        }
      }
    }

    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++) {
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

  function ExpandArray(input, colorStyle) {
    var output = [];
    for (var i = 0; i < input.length; i++) {
      output = output.concat(input[i]);
    }
    return output;
  }

  function RandomNumber() {
    return Math.random();
  }

  function NearestPow2(num) {
    return Math.pow(2, Math.round(Math.log(num) / Math.log(2)));
  }

  var publicAPI = {
    generate: generate
  };

  return publicAPI;
})();
