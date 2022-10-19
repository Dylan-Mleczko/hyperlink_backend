"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readById = exports.readAll = void 0;

var _ramdaAdjunct = require("ramda-adjunct");

var _validator = require("validator");

var _models = require("../../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var readById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (linkId) {
    if (!(0, _validator.isMongoId)("".concat(linkId))) {
      console.log("Invalid linkId ".concat(linkId));
      return undefined;
    }

    var link = yield _models.Link.findById(linkId);

    if ((0, _ramdaAdjunct.isNilOrEmpty)(link)) {
      console.log("Cannot find link with id: ".concat(linkId));
    }

    return link;
  });

  return function readById(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.readById = readById;

var readAll = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    var links = yield _models.Link.find();
    return links;
  });

  return function readAll() {
    return _ref2.apply(this, arguments);
  };
}();

exports.readAll = readAll;