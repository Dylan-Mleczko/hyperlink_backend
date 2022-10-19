"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLink = exports.getLink = exports.getAllLink = exports.deleteLink = exports.addLink = void 0;

var linkService = _interopRequireWildcard(require("../../../../services/link"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addLink = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var data = req.body;
    var linkDetails = data.linkDetails; // data validation

    var linkDetailSchema = _joi.default.object().keys({
      uri: _joi.default.string().min(0).required().uri(),
      name: _joi.default.string().min(0).max(127),
      collection_id: _joi.default.string()
    });

    var linkDetailError = linkDetailSchema.validate(linkDetails).error;

    if (!(linkDetailError == null)) {
      var errorMsg = linkDetailError.details[0].message;
      console.log(errorMsg);
      res.status(422).json({
        message: errorMsg,
        data: null
      });
      return;
    }

    var newLink = yield linkService.create({
      uri: linkDetails.uri,
      name: linkDetails.name,
      collection_id: linkDetails.collection_id
    });

    if (newLink == null) {
      res.status(422).json({
        message: 'failed to create link',
        data: null
      });
      return;
    }

    res.json({
      data: {
        link: newLink
      }
    });
  });

  return function addLink(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addLink = addLink;

var getAllLink = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var links = yield linkService.readAll();
    res.json({
      data: {
        links
      }
    });
  });

  return function getAllLink(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllLink = getAllLink;

var getLink = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var link = yield linkService.readById(req.params.id);
    res.json({
      data: {
        link
      }
    });
  });

  return function getLink(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getLink = getLink;

var updateLink = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var newLink = yield linkService.update(req.params.id, req.body.linkDetails);
    res.json({
      data: {
        newLink
      }
    });
  });

  return function updateLink(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateLink = updateLink;

var deleteLink = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var newLink = yield linkService.deleteById({
      linkId: req.params.id
    });
    res.json({
      data: {
        newLink
      }
    });
  });

  return function deleteLink(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteLink = deleteLink;