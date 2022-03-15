"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mutation = _interopRequireDefault(require("./mutation"));

function isOblique(col, row, dna) {
  var _char = dna[row].charAt(col).toUpperCase();

  var upCount = 0;
  var downCount = 0;

  if (dna[row].length >= 4 && dna.length >= 4) {
    // Up
    if (col - 1 >= 0 && row - 1 >= 0) {
      var i = col - 1;
      var j = row - 1;

      while (i >= 0 && j >= 0) {
        var upChar = dna[j].charAt(i).toUpperCase();

        if (upChar === _char) {
          upCount++;
        } else {
          break;
        }

        i--;
        j--;
      }
    } // Down


    if (col + 1 < dna[row].length && row + 1 < dna.length) {
      var _i = col + 1;

      var _j = row + 1;

      while (_i < dna[row].length && _j < dna.length) {
        var downChar = dna[_j].charAt(_i).toUpperCase();

        if (downChar === _char) {
          downCount++;
        } else {
          break;
        }

        _i++;
        _j++;
      }
    }

    var total = upCount + downCount + 1;

    if (total >= 4) {
      _mutation["default"].mutations.push([col, row]);

      var _i2 = col + 1;

      var _j2 = row + 1;

      while (_i2 <= col + downCount && _j2 <= row + downCount) {
        _mutation["default"].mutations.push([_i2, _j2]);

        _i2++;
        _j2++;
      }

      return true;
    }
  }

  return false;
}

module.exports = isOblique;