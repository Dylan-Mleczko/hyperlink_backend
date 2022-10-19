"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCollection = exports.getUserCollections = exports.getCollectionImage = exports.getCollection = exports.deleteCollection = exports.bufferToBase64Image = exports.addTagToCollection = exports.addCollection = void 0;

var collectionService = _interopRequireWildcard(require("../../../../services/collection"));

var tagService = _interopRequireWildcard(require("../../../../services/tag"));

var _joi = _interopRequireDefault(require("joi"));

var _buffer = require("buffer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var base64ImageToBuffer = base64Data => {
  var imageData = base64Data.replace(/^data:image\/\w+;base64,/, ''); // var dataBuffer = new Buffer(imageData, 'base64');

  var dataBuffer = _buffer.Buffer.from(imageData, 'base64');

  return dataBuffer;
};

var getImageType = base64Data => {
  var index = base64Data.indexOf(';');
  console.log(index);
  var temp = base64Data.substring(11, index);
  return temp;
};

var bufferToBase64Image = (bufferData, imageType) => {
  var base64Str = bufferData.toString('base64');
  var base64Image = "data:image/".concat(imageType, ";base64,").concat(base64Str); // console.log(typeof bufferData);
  // var dataBuffer = new Buffer(base64Str, 'base64');
  // let ws = fs.createWriteStream(dataBuffer);

  return base64Image;
};

exports.bufferToBase64Image = bufferToBase64Image;

var addCollection = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    // console.log(req);
    var data = req.body; // console.log(data);

    var collectionDetails = data.formData;
    var user = req.user;
    console.log(user._id.toString()); // console.log(collectionDetails);

    console.log(getImageType(collectionDetails.image)); // data validation

    var collectionDetailSchema = _joi.default.object().keys({
      name: _joi.default.string().min(0).max(127).required(),
      description: _joi.default.string().min(0).max(4095),
      user_id: _joi.default.string(),
      tags: _joi.default.string(),
      image: _joi.default.string() // image: Joi.object(),

    });

    var collectionDetailError = collectionDetailSchema.validate(collectionDetails).error;

    if (!(collectionDetailError == null)) {
      var errorMsg = collectionDetailError.details[0].message;
      console.log(errorMsg);
      res.status(422).json({
        message: errorMsg,
        data: null
      });
      return;
    } // console.log(JSON.stringify(collectionDetails));
    // res.json({ data: { collection: collectionDetails } });


    console.log('-----------Joi-Validation-pass------------');
    var newCollection = yield collectionService.create({
      name: collectionDetails.name,
      description: collectionDetails.description,
      tags: collectionDetails.tags,
      image: base64ImageToBuffer(collectionDetails.image),
      image_type: getImageType(collectionDetails.image),
      user_id: user._id.toString() // collectionDetails.user_id,

    }); // console.log(newCollection);

    if (newCollection == null) {
      res.status(422).json({
        message: 'failed to create collection',
        data: null
      });
      return;
    } // const base64Img = bufferToBase64Image(
    //   newCollection.image.data,
    //   newCollection.image_type
    // );
    // console.log(base64Img.substring(0, 50));


    newCollection.image = newCollection.image != null ? newCollection._id.toString() : null;
    res.json({
      data: {
        collection: newCollection
      }
    });
  });

  return function addCollection(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addCollection = addCollection;

var getUserCollections = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var collections = yield collectionService.readAllByUserId(req.user._id);
    var colls = collections.map(collection => {
      if (collection.image) collection.image = collection._id.toString();else collection.image = null;
      return collection;
    });
    res.json({
      data: {
        collections: colls
      }
    });
  });

  return function getUserCollections(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserCollections = getUserCollections;

var getCollection = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var collection = yield collectionService.readById(req.params.id);
    if (collection.image) collection.image = collection._id.toString();else collection.image = null;
    res.json({
      data: {
        collection
      }
    });
  });

  return function getCollection(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCollection = getCollection;

var getCollectionImage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var imageType = req.params.type;
    var collectionId = req.params.id;
    var collection = yield collectionService.readById(collectionId);

    if (collection && collection.image.data && collection.image.type && collection.image.type === 'Buffer') {
      if (imageType && imageType === 'base64') {
        // // output base64 image
        var base64ImgStr = bufferToBase64Image(collection.image.data, collection.image_type);
        res.send(base64ImgStr);
      } else {
        res.set('content-type', {
          png: 'image/png',
          jpg: 'image/jpeg'
        });

        var dataBuffer = _buffer.Buffer.from(collection.image.data.toString('hex'), 'hex');

        res.send(dataBuffer);
      }
    } else {
      res.send('');
    }
  });

  return function getCollectionImage(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getCollectionImage = getCollectionImage;

var updateCollection = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    console.log(updateCollection);
    var collection = yield collectionService.update(req.params.id, req.body.collectionDetails);
    res.json({
      data: {
        collection
      }
    });
  });

  return function updateCollection(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateCollection = updateCollection;

var deleteCollection = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    var newCollection = yield collectionService.deleteById({
      collectionId: req.params.id
    });
    res.json({
      data: {
        newCollection
      }
    });
  });

  return function deleteCollection(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteCollection = deleteCollection;

var addTagToCollection = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    // check for existing tag with name
    var exists = false;
    var addTag = null;
    var existingCollection = yield collectionService.readById(req.body.collection_id);
    var newTagName = req.body.tagDetails.name; // check if any other collections of the user have the tag

    var collections = yield collectionService.readAllByUserId(req.body.user_id);

    for (var collection of collections) {
      for (var tag of collection.tags) {
        if (tag.name === newTagName) {
          if (collection.id === existingCollection.id) {
            exists = true;
          } else {
            addTag = tag;
          }
        }
      }
    }

    if (!exists) {
      if (addTag == null) {
        console.log('creating new tag');
        addTag = yield tagService.create(req.body.tagDetails);
      }

      var newCollection = yield collectionService.update(req.body.collection_id, {
        tags: [...existingCollection.tags, addTag]
      });
      res.json({
        data: {
          newCollection
        }
      });
      return;
    } // check if the collection already contains the tag


    res.json({
      res: 'tag already exists in collections'
    });
  });

  return function addTagToCollection(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.addTagToCollection = addTagToCollection;