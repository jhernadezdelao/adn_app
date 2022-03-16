"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signUp = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var signUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (req, res) {
    try {
      // Getting the Request Body
      var {
        username,
        email,
        password,
        roles
      } = req.body; // Creating a new User Object

      var newUser = new _User.default({
        username,
        email,
        password: yield _User.default.encryptPassword(password)
      }); // checking for roles

      if (req.body.roles) {
        var foundRoles = yield _Role.default.find({
          name: {
            $in: roles
          }
        });
        newUser.roles = foundRoles.map(role => role._id);
      } else {
        var role = yield _Role.default.findOne({
          name: "user"
        });
        newUser.roles = [role._id];
      } // Saving the User Object in Mongodb


      var savedUser = yield newUser.save(); // Create a token

      var token = _jsonwebtoken.default.sign({
        id: savedUser._id
      }, _config.default.SECRET, {
        expiresIn: 86400 // 24 hours

      });

      return res.status(200).json({
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (req, res) {
    try {
      // Request body email can be an email or username
      var userFound = yield _User.default.findOne({
        email: req.body.email
      }).populate("roles");
      if (!userFound) return res.status(400).json({
        message: "User Not Found"
      });
      var matchPassword = yield _User.default.comparePassword(req.body.password, userFound.password);
      if (!matchPassword) return res.status(401).json({
        token: null,
        message: "Invalid Password"
      });

      var token = _jsonwebtoken.default.sign({
        id: userFound._id
      }, _config.default.SECRET, {
        expiresIn: 86400 // 24 hours

      });

      res.json({
        token
      });
    } catch (error) {
      console.log(error);
    }
  });

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;