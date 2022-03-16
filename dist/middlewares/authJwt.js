"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.isAdmin = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({
      message: "No token provided"
    });

    try {
      var decoded = _jsonwebtoken.default.verify(token, _config.default.SECRET);

      req.userId = decoded.id;
      var user = yield _User.default.findById(req.userId, {
        password: 0
      });
      if (!user) return res.status(404).json({
        message: "No user found"
      });
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized!"
      });
    }
  });

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var isAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (req, res, next) {
    try {
      var user = yield _User.default.findById(req.userId);
      var roles = yield _Role.default.find({
        _id: {
          $in: user.roles
        }
      });

      for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return res.status(403).json({
        message: "Require Admin Role!"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error
      });
    }
  });

  return function isAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;