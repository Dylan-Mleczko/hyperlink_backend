"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.create = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _models = require("../../models");

var _tag = require("../tag");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (collectionInfo) {
    var schema = _joi.default.object({
      name: _joi.default.string().min(0).max(127).required(),
      description: _joi.default.string().min(0).max(4095),
      user_id: _joi.default.string()
    }); // const collectionDetailError = collectionDetailSchema.validate(collectionDetails).error;
    // const errorMsg = collectionDetailError.details[0].message;
    // console.log();


    return schema.validate(collectionInfo);
  });

  return function validate(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.validate = validate;

var create = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (_ref2) {
    var {
      name,
      description,
      user_id,
      tags = null,
      image = null,
      image_type = null
    } = _ref2;
    var imgData = image ? {
      type: 'Buffer',
      data: image
    } : null;
    var collectionData = {
      name,
      description,
      tags: null,
      image: imgData,
      image_type,
      click_count: 0,
      favourite: false,
      user_id,
      created_at: Date.now(),
      updated_at: null
    };
    console.log('collection.create: ', collectionData);
    var collection;
    collection = yield _models.Collection.create(collectionData);
    collection = yield _models.Collection.findById(collection._id);
    if (!tags) return collection;
    var v_tags_name = [];
    var v_tags = [];
    var separator = /,|:|;| /;
    var temp_tags = tags.split(separator).map(item => item.trim()).filter(item => item !== '');
    v_tags_name = [...new Set(temp_tags)];
    console.log('v_tags_name:', v_tags_name);

    for (var i = 0; i < v_tags_name.length; i++) {
      var tag = yield (0, _tag.create)({
        name: v_tags_name[i]
      });
      v_tags.push(tag._id.toString());
    }

    if (v_tags.length == 0) return collection;
    collection.tags = v_tags;
    yield collection.save();
    collection = yield _models.Collection.findById(collection._id);
    return collection;
  });

  return function create(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.create = create;