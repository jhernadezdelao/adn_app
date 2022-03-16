"use strict";

var mutations = [];

function existMutation(mutation) {
  var exist = mutations.find(m => m[0] === mutation[0] && m[1] === mutation[1]);

  if (exist) {
    return true;
  }

  return false;
}

function resetData() {
  mutations.splice(0, mutations.length);
}

module.exports = {
  mutations,
  existMutation,
  resetData
};