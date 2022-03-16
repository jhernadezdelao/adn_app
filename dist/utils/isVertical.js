"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mutation = _interopRequireDefault(require("./mutation"));

function isVertical(col, row, dna) {
  if (row < dna.length) {
    var char = dna[row].charAt(col).toUpperCase();
    var topCount = 0;
    var bottomCount = 0;

    if (dna.length >= 4) {
      // Top
      if (row - 1 >= 0) {
        for (var i = row - 1; i >= 0; i--) {
          var topChar = dna[i].charAt(col).toUpperCase();

          if (topChar === char && topCount < 3) {
            topCount++;
          } else {
            break;
          }
        }
      } // Bottom


      if (row + 1 < dna.length) {
        for (var _i = row + 1; _i < dna.length; _i++) {
          var bottomChar = dna[_i].charAt(col).toUpperCase();

          if (bottomChar === char && topCount < 3) {
            bottomCount++;
          } else {
            break;
          }
        }
      }

      var total = topCount + bottomCount + 1;

      if (total >= 4) {
        _mutation.default.mutations.push([col, row]);

        for (var j = row + 1; j <= row + bottomCount; j++) {
          _mutation.default.mutations.push([col, j]);
        }

        return true;
      }
    }
  }

  return false;
}

module.exports = isVertical;