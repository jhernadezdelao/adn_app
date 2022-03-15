"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

_mongoose["default"].connect(_config["default"].MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (db) {
  return console.log("DB is connected");
})["catch"](function (err) {
  return console.log(err);
});