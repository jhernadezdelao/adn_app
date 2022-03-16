"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var productSchema = new _mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }]
}, {
  timestamps: true,
  versionKey: false
});

productSchema.statics.encryptPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (password) {
    var salt = yield _bcryptjs.default.genSalt(10);
    return yield _bcryptjs.default.hash(password, salt);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

productSchema.statics.comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (password, receivedPassword) {
    return yield _bcryptjs.default.compare(password, receivedPassword);
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = (0, _mongoose.model)("User", productSchema);

exports.default = _default;