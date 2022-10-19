"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTag = exports.getTag = exports.deleteTag = exports.addTag = void 0;

var tagService = _interopRequireWildcard(require("../../../../services/tag"));

var collectionService = _interopRequireWildcard(require("../../../../services/collection"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addTag = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var data = req.body;
    var tagDetails = data.tagDetails; // data validation

    var tagDetailSchema = _joi.default.object().keys({
      name: _joi.default.string().min(0).max(63).required()
    });

    var tagDetailError = tagDetailSchema.validate(tagDetails).error;

    if (!(tagDetailError == null)) {
      var errorMsg = tagDetailError.details[0].message;
      console.log(errorMsg);
      res.status(422).json({
        message: errorMsg,
        data: null
      });
      return;
    }

    var newTag = yield tagService.create({
      name: tagDetails.name
    });

    if (newTag == null) {
      res.status(422).json({
        message: 'failed to create tag',
        data: null
      });
      return;
    }

    res.json({
      data: {
        tag: newTag
      }
    });
  });

  return function addTag(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addTag = addTag;

var getTag = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var tag = yield tagService.readById(req.params.id);
    res.json({
      data: {
        tag
      }
    });
  });

  return function getTag(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTag = getTag;

var updateTag = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var newTag = yield tagService.update(req.params.id, req.body.tagDetails);
    res.json({
      data: {
        newTag
      }
    });
  });

  return function updateTag(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateTag = updateTag;

var deleteTag = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var collections = yield collectionService.readAllByUserId(req.body.user_id);

    for (var collection of collections) {
      yield collectionService.update(collection.id, {
        tags: collection.tags.filter(tag => {
          return tag.toHexString() != req.params.id;
        })
      });
    }

    yield tagService.deleteById({
      tagId: req.params.id
    });
    res.status(200).json({
      res: 'deleted tag successfully'
    });
  });

  return function deleteTag(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteTag = deleteTag;