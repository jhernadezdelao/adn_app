"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = exports.getUser = exports.createUser = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (req, res) {
    try {
      var {
        username,
        email,
        password,
        roles
      } = req.body;
      var rolesFound = yield _Role.default.find({
        name: {
          $in: roles
        }
      }); // creating a new User

      var user = new _User.default({
        username,
        email,
        password,
        roles: rolesFound.map(role => role._id)
      }); // encrypting password

      user.password = yield _User.default.encryptPassword(user.password); // saving the new user

      var savedUser = yield user.save();
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles
      });
    } catch (error) {
      console.error(error);
    }
  });

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getUsers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (req, res) {});

  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (req, res) {});

  return function getUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUser = getUser;