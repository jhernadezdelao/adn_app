"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRolesExisted = exports.checkDuplicateUsernameOrEmail = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = require("../models/Role");

var checkDuplicateUsernameOrEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (req, res, next) {
    try {
      var user = yield _User.default.findOne({
        username: req.body.username
      });
      if (user) return res.status(400).json({
        message: "The user already exists"
      });
      var email = yield _User.default.findOne({
        email: req.body.email
      });
      if (email) return res.status(400).json({
        message: "The email already exists"
      });
      next();
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  });

  return function checkDuplicateUsernameOrEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;

var checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!_Role.ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: "Role ".concat(req.body.roles[i], " does not exist")
        });
      }
    }
  }

  next();
};

exports.checkRolesExisted = checkRolesExisted;