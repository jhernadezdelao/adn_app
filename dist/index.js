"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./database");

_app["default"].listen(3000, '0.0.0.0', function () {
  console.log("server running");
});