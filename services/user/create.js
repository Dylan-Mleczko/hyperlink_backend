"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.create = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _models = require("../../models");

var _nanoid = require("nanoid");

var _auth = require("../auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (loginInfo) {
    var schema = _joi.default.object({
      email: _joi.default.string().min(5).max(255).required().email(),
      password: _joi.default.string().min(5).max(255).required()
    });

    return schema.validate(loginInfo);
  });

  return function validate(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validate = validate;

var create = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      email,
      first_name,
      last_name,
      password,
      active = true
    } = _ref2;
    var hashedPassword = password; // console.log(password);

    var isHashed = yield (0, _auth.isHashedPassword)(password);

    if (!isHashed) {
      hashedPassword = yield (0, _auth.hashPassword)(password);
    }

    var userData = {
      email,
      password: hashedPassword,
      name: {
        first: first_name,
        last: last_name
      },
      jti: (0, _nanoid.nanoid)(16),
      created_at: Date.now(),
      updated_at: null,
      sign_in_count: 0,
      active
    };
    var user = yield _models.User.create(userData);
    return user;
  });

  return function create(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.create = create;