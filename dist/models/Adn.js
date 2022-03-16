"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var adnSchema = new _mongoose.Schema({
  dna: String,
  mutant: Number
}, {
  timestamp: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Adn', adnSchema);

exports.default = _default;