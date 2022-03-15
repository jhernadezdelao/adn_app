"use strict";

function isValid(value) {
  var _char = value.toUpperCase();

  if (_char === 'A' || _char === 'T' || _char === 'C' || _char === 'G') {
    return true;
  }

  return false;
}

module.exports = isValid;