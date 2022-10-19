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
  var _ref = _asyncToGenerator(function* (tagId, props) {
    var tag = yield _models.Tag.findById(tagId);

    if ((0, _ramdaAdjunct.isNilOrEmpty)(tag)) {
      console.log("Cannot find tag with id: ".concat(tagId));
      return undefined;
    }

    if (props.name) {
      tag.name = props.name;
    }

    yield tag.save();
    var updatedTag = yield _models.Tag.findById(tagId);
    return updatedTag;
  });

  return function update(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.update = update;