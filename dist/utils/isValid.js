"use strict";

function isValid(value) {
  var char = value.toUpperCase();

  if (char === 'A' || char === 'T' || char === 'C' || char === 'G') {
    return true;
  }

  return false;
}

module.exports = isValid;