"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readByJTI = exports.readById = exports.readByEmail = exports.readAll = void 0;

var _ramdaAdjunct = require("ramda-adjunct");

var _validator = require("validator");

var _models = require("../../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var readById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (userId) {
    if (!(0, _validator.isMongoId)("".concat(userId))) {
      console.log("Invalid userId ".concat(userId));
      return undefined;
    }

    var user = yield _models.User.findById(userId);

    if ((0, _ramdaAdjunct.isNilOrEmpty)(user)) {
      console.log("Cannot find user with id: ".concat(userId));
    }

    return user;
  });

  return function readById(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.readById = readById;

var readByEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (email) {
    var user = yield _models.User.findOne({
      email,
      activeStatus: true
    });

    if ((0, _ramdaAdjunct.isNilOrEmpty)(user)) {
      console.log("Cannot find user with email:  ".concat(email));
      return undefined;
    }

    return user;
  });

  return function readByEmail(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.readByEmail = readByEmail;

var readAll = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    var users = yield _models.User.find();
    return users;
  });

  return function readAll() {
    return _ref3.apply(this, arguments);
  };
}();

exports.readAll = readAll;

var readByJTI = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (jti) {
    var user = yield _models.User.findOne({
      jti,
      active: true
    });

    if ((0, _ramdaAdjunct.isNilOrEmpty)(user)) {
      console.log("Cannot find user with jti:  ".concat(jti));
      return undefined;
    }

    return user;
  });

  return function readByJTI(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.readByJTI = readByJTI;