"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mutation = _interopRequireDefault(require("./mutation"));

function isHorizontal(col, row, dna) {
  if (col < dna[row].length) {
    var char = dna[row].charAt(col).toUpperCase();
    var leftCount = 0;
    var rightCount = 0;

    if (dna[row].length >= 4) {
      // Left
      if (col - 1 >= 0) {
        for (var i = col - 1; i >= 0; i--) {
          var leftChar = dna[row].charAt(i).toUpperCase();

          if (leftChar === char) {
            leftCount++;
          } else {
            break;
          }
        }
      } // Right


      if (col + 1 < dna[row].length) {
        for (var _i = col + 1; _i < dna[row].length; _i++) {
          var rightChar = dna[row].charAt(_i).toUpperCase();

          if (rightChar === char) {
            rightCount++;
          } else {
            break;
          }
        }
      }

      var total = leftCount + rightCount + 1;

      if (total >= 4) {
        _mutation.default.mutations.push([col, row]);

        for (var _i2 = col + 1; _i2 <= col + rightCount; _i2++) {
          _mutation.default.mutations.push([_i2, row]);
        }

        return true;
      }
    }
  }

  return false;
}

module.exports = isHorizontal;