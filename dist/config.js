"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  MONGODB_URI: process.env.MONGODB_HOST || "mongodb://localhost/adndb",
  PORT: process.env.PORT || 4000,
  SECRET: 'adn-api'
};
exports.default = _default;