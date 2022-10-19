"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = void 0;

var _ramdaAdjunct = require("ramda-adjunct");

var _models = require("../../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var update = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (userId, props) {
    var user = yield _models.User.findById(userId);

    if ((0, _ramdaAdjunct.isNilOrEmpty)(user)) {
      console.log("Cannot find user with id: ".concat(userId));
      return undefined;
    }

    if (props.active !== undefined) {
      user.active = props.active;
    }

    if (props.email) {
      user.email = props.email;
    }

    if (props.password) {
      user.password = props.password;
    }

    if (props.first_name) {
      user.name.first = props.first_name;
    }

    if (props.last_name) {
      user.name.last = props.last_name;
    }

    yield user.save();
    var updatedUser = yield _models.User.findById(userId);
    return updatedUser;
  });

  return function update(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.update = update;