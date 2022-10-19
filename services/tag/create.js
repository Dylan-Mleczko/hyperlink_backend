"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.create = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _models = require("../../models");

var _read = require("./read");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (tagName) {
    var schema = _joi.default.object({
      name: _joi.default.string().min(3).max(63).required() // tags must be 3 to 31 chars long

    });

    return schema.validate(tagName);
  });

  return function validate(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validate = validate;

var create = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      name
    } = _ref2;
    var tag = yield (0, _read.readByName)(name);
    if (tag) return tag;
    var tagData = {
      name,
      created_at: Date.now(),
      updated_at: null
    };
    tag = yield _models.Tag.create(tagData);
    return tag;
  });

  return function create(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.create = create;