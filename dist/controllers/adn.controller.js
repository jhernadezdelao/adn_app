"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdn = exports.checkAdn = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Adn = _interopRequireDefault(require("../models/Adn"));

var _isHorizontal = _interopRequireDefault(require("../utils/isHorizontal"));

var _isVertical = _interopRequireDefault(require("../utils/isVertical"));

var _isOblique = _interopRequireDefault(require("../utils/isOblique"));

var _isObliqueInvert = _interopRequireDefault(require("../utils/isObliqueInvert"));

var _isValid = _interopRequireDefault(require("../utils/isValid"));

var _mutation = _interopRequireDefault(require("../utils/mutation"));

var checkAdn = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (req, res) {
    console.log(req.body);
    var adn_temp = req.body.dna;

    try {
      var dna = adn_temp.join("-");
      var mutant = 0;

      if (hasMutation(adn_temp)) {
        mutant = 1;

        var _adn = new _Adn.default({
          dna,
          mutant
        });

        var adnSaved = yield _adn.save();
        res.status(200).json(_adn);
      } else {
        mutant = 0;

        var _adn2 = new _Adn.default({
          dna,
          mutant
        });

        var _adnSaved = yield _adn2.save();

        res.status(403).json(_adn2);
      }
    } catch (err) {
      console.error(err.message);
      res.status(200).json(err.message);
    }

    return;
  });

  return function checkAdn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkAdn = checkAdn;

var getAdn = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (req, res) {
    var dnaList = yield _Adn.default.aggregate([{
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
    console.log(dnaList[0]);
    dnaList[0]['ratio'] = dnaList[0]['count_mutations'] / dnaList[0]['count_no_mutation'];
    res.status(200).json(dnaList);
  });

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
    dna.forEach((element, row) => {
      for (var col = 0; col < element.length; col++) {
        if ((0, _isValid.default)(dna[row].charAt(col))) {
          if (!_mutation.default.existMutation([col, row])) {
            if ((0, _isHorizontal.default)(col, row, dna) || (0, _isVertical.default)(col, row, dna) || (0, _isOblique.default)(col, row, dna) || (0, _isObliqueInvert.default)(col, row, dna)) {
              mutationsCount++;
            }
          }
        } else {
          throw new Error('Hay un caracter invalido, solo se permiten los siguientes caracteres: A, T, C, G');
        }
      }
    });
  }

  _mutation.default.resetData();

  if (mutationsCount >= 2) {
    return true;
  }

  return false;
}