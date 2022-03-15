"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdn = exports.checkAdn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Adn = _interopRequireDefault(require("../models/Adn"));

var _isHorizontal = _interopRequireDefault(require("../utils/isHorizontal"));

var _isVertical = _interopRequireDefault(require("../utils/isVertical"));

var _isOblique = _interopRequireDefault(require("../utils/isOblique"));

var _isObliqueInvert = _interopRequireDefault(require("../utils/isObliqueInvert"));

var _isValid = _interopRequireDefault(require("../utils/isValid"));

var _mutation = _interopRequireDefault(require("../utils/mutation"));

var checkAdn = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var adn_temp, dna, mutant, _adn, adnSaved, _adn2, _adnSaved;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            adn_temp = req.body.dna;
            _context.prev = 2;
            dna = adn_temp.join("-");
            mutant = 0;

            if (!hasMutation(adn_temp)) {
              _context.next = 14;
              break;
            }

            mutant = 1;
            _adn = new _Adn["default"]({
              dna: dna,
              mutant: mutant
            });
            _context.next = 10;
            return _adn.save();

          case 10:
            adnSaved = _context.sent;
            res.status(200).json(_adn);
            _context.next = 20;
            break;

          case 14:
            mutant = 0;
            _adn2 = new _Adn["default"]({
              dna: dna,
              mutant: mutant
            });
            _context.next = 18;
            return _adn2.save();

          case 18:
            _adnSaved = _context.sent;
            res.status(403).json(_adn2);

          case 20:
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](2);
            console.error(_context.t0.message);
            res.status(200).json(_context.t0.message);

          case 26:
            return _context.abrupt("return");

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 22]]);
  }));

  return function checkAdn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkAdn = checkAdn;

var getAdn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var dnaList;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Adn["default"].aggregate([{
              "$facet": {
                "Total": [{
                  "$match": {
                    "mutant": {
                      "$exists": true
                    }
                  }
                }, {
                  "$count": "Total"
                }],
                "count_mutations": [{
                  "$match": {
                    "mutant": {
                      "$exists": true,
                      "$in": [1]
                    }
                  }
                }, {
                  "$count": "count_mutations"
                }],
                "count_no_mutation": [{
                  "$match": {
                    "mutant": {
                      "$exists": true,
                      "$in": [0]
                    }
                  }
                }, {
                  "$count": "count_no_mutation"
                }]
              }
            }, {
              "$project": {
                "Total": {
                  "$arrayElemAt": ["$Total.Total", 0]
                },
                "count_mutations": {
                  "$arrayElemAt": ["$count_mutations.count_mutations", 0]
                },
                "count_no_mutation": {
                  "$arrayElemAt": ["$count_no_mutation.count_no_mutation", 0]
                }
              }
            }]);

          case 2:
            dnaList = _context2.sent;
            console.log(dnaList[0]);
            dnaList[0]['ratio'] = dnaList[0]['count_mutations'] / dnaList[0]['count_no_mutation'];
            res.status(200).json(dnaList);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAdn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAdn = getAdn;

function suma(a, b) {
  return a + b;
}

function hasMutation(dna) {
  var rows = dna.length;
  var cols = dna[0].length;
  var mutationsCount = 0;

  if (rows >= 4 || cols >= 4) {
    dna.forEach(function (element, row) {
      for (var col = 0; col < element.length; col++) {
        if ((0, _isValid["default"])(dna[row].charAt(col))) {
          if (!_mutation["default"].existMutation([col, row])) {
            if ((0, _isHorizontal["default"])(col, row, dna) || (0, _isVertical["default"])(col, row, dna) || (0, _isOblique["default"])(col, row, dna) || (0, _isObliqueInvert["default"])(col, row, dna)) {
              mutationsCount++;
            }
          }
        } else {
          throw new Error('Hay un caracter invalido, solo se permiten los siguientes caracteres: A, T, C, G');
        }
      }
    });
  }

  _mutation["default"].resetData();

  if (mutationsCount >= 2) {
    return true;
  }

  return false;
}