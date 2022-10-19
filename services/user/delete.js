"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteById = void 0;

var _models = require("../../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (_ref) {
    var {
      userId,
      realDelete = false
    } = _ref;
    console.log('received data: ', userId, realDelete);

    if (!realDelete) {
      var updatedUser = yield _models.User.findByIdAndUpdate(userId, {
        $set: {
          active: false,
          updated_at: new Date()
        }
      });
      console.log("Deleted user by Id: ".concat(userId, ", User: ").concat(JSON.stringify(updatedUser)));
      return updatedUser;
    }

    var deletedUser = yield _models.User.findByIdAndDelete(userId);
    console.log("Deleted user by Id: ".concat(userId, ", User: ").concat(JSON.stringify(deletedUser)));
    return deletedUser;
  });

  return function deleteById(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteById = deleteById;