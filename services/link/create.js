"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.create = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _models = require("../../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (linkInfo) {
    var schema = _joi.default.object({
      uri: _joi.default.string().min(5).max(255).required().uri(),
      name: _joi.default.string().min(3).max(31).required(),
      collection_id: _joi.default.string()
    });

    return schema.validate(linkInfo);
  });

  return function validate(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validate = validate;

var create = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      uri,
      name,
      collection_id,
      description = '',
      thumbnail = null
    } = _ref2;
    var linkData = {
      uri,
      name,
      description,
      click_count: 0,
      thumbnail,
      collection_id,
      created_at: Date.now(),
      updated_at: null
    };
    var link = yield _models.Link.create(linkData);
    return link;
  });

  return function create(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.create = create;