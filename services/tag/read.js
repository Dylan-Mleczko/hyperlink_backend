"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readByName = exports.readById = void 0;

var _ramdaAdjunct = require("ramda-adjunct");

var _validator = require("validator");

var _models = require("../../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var readById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (tagId) {
    if (!(0, _validator.isMongoId)("".concat(tagId))) {
      console.log("Invalid tagId ".concat(tagId));
      return undefined;
    }

    var tag = yield _models.Tag.findById(tagId);

    if ((0, _ramdaAdjunct.isNilOrEmpty)(tag)) {
      console.log("Cannot find tag with id: ".concat(tagId));
    }

    return tag;
  });

  return function readById(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.readById = readById;

var readByName = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (tagName) {
    var tag = yield _models.Tag.findOne({
      name: tagName
    }).exec(); // if (isNilOrEmpty(tag)) {
    //   console.log(`Cannot find tag with name: ${tagName}`);
    // }

    return tag;
  });

  return function readByName(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.readByName = readByName;