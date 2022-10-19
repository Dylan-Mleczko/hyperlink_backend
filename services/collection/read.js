"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readById = exports.readAllByUserId = void 0;

var _ramdaAdjunct = require("ramda-adjunct");

var _validator = require("validator");

var _models = require("../../models");

var tagService = _interopRequireWildcard(require("../tag"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function resolveTags(_x) {
  return _resolveTags.apply(this, arguments);
}

function _resolveTags() {
  _resolveTags = _asyncToGenerator(function* (tags) {
    var resolvedTags = [];

    for (var tag of tags) {
      yield tagService.readById(tag).then(response => {
        resolvedTags = [...resolvedTags, response];
      }).catch(error => {
        console.log(error);
      });
    }

    return resolvedTags;
  });
  return _resolveTags.apply(this, arguments);
}

var readById = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (collectionId) {
    if (!(0, _validator.isMongoId)("".concat(collectionId))) {
      console.log("Invalid collectionId ".concat(collectionId));
      return undefined;
    }

    var collection = yield _models.Collection.findById(collectionId);

    if ((0, _ramdaAdjunct.isNilOrEmpty)(collection)) {
      console.log("Cannot find collection with id: ".concat(collectionId));
    }

    var collectionWithTag = collection;
    collectionWithTag.tags = yield resolveTags(collection.tags);
    return collectionWithTag;
  });

  return function readById(_x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.readById = readById;

var readAllByUserId = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (userId) {
    if (!(0, _validator.isMongoId)("".concat(userId))) {
      console.log("Invalid userId ".concat(userId));
      return undefined;
    }

    var collections = yield _models.Collection.find({
      user_id: userId
    });

    if ((0, _ramdaAdjunct.isNilOrEmpty)(collections)) {
      console.log("Cannot find collection with user id: ".concat(userId));
    }

    var collectionsWithTags = [];

    for (var collection of collections) {
      var collectionWithTag = collection;
      collectionWithTag.tags = yield resolveTags(collection.tags);
      collectionsWithTags = [...collectionsWithTags, collectionWithTag];
    }

    return collectionsWithTags;
  });

  return function readAllByUserId(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.readAllByUserId = readAllByUserId;