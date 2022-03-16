"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = exports.createAdmin = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var createRoles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* () {
    try {
      // Count Documents
      var count = yield _Role.default.estimatedDocumentCount(); // check for existing roles

      if (count > 0) return; // Create default Roles

      var values = yield Promise.all([new _Role.default({
        name: "user"
      }).save(), new _Role.default({
        name: "admin"
      }).save()]);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  });

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* () {
    // check for an existing admin user
    var user = yield _User.default.findOne({
      email: "admin@localhost"
    }); // get roles _id

    var roles = yield _Role.default.find({
      name: "admin"
    });

    if (!user) {
      // create a new admin user
      yield _User.default.create({
        username: "admin",
        email: "admin@localhost",
        password: yield _bcryptjs.default.hash("admin", 10),
        roles: roles.map(role => role._id)
      });
      console.log('Admin User Created!');
    }
  });

  return function createAdmin() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAdmin = createAdmin;