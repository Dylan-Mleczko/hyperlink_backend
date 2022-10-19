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
      collectionId
    } = _ref;
    var deletedCollection = yield _models.Collection.findByIdAndDelete(collectionId);
    console.log("Deleted collection by Id: ".concat(collectionId, ", Collection: ").concat(JSON.stringify(deletedCollection)));
    return deletedCollection;
  });

  return function deleteById(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteById = deleteById;