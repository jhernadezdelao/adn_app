"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

_mongoose.default.connect(_config.default.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log("DB is connected")).catch(err => console.log(err));