"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _adn = _interopRequireDefault(require("./routes/adn.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _initialSetup = require("./libs/initialSetup");

var app = (0, _express.default)();
(0, _initialSetup.createRoles)();
(0, _initialSetup.createAdmin)();
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);
var corsOptions = {// origin: "http://localhost:3000",
};
app.use((0, _cors.default)(corsOptions));
app.use((0, _helmet.default)());
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.get('/', (req, res) => {
  res.json("Hello world");
});
app.use('/api/adn', _adn.default);
app.use("/api/users", _user.default);
app.use("/api/auth", _auth.default);
var _default = app;
exports.default = _default;