"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _constant = require("../constant");

var _controllers = require("../../controllers");

var _auth = require("../../../middleware/auth");

var router = (0, _express.Router)();
exports.router = router;
router.post(_constant.newCollectionRouterPath, [_auth.passportAuth], _controllers.collectionController.addCollection);
router.get(_constant.allUserCollectionsRouterPath, [_auth.passportAuth], _controllers.collectionController.getUserCollections);
router.get(_constant.getCollectionRouterPath, [_auth.passportAuth], _controllers.collectionController.getCollection);
router.get(_constant.getCollectionImageRouterPath, _controllers.collectionController.getCollectionImage);
router.get(_constant.getCollectionImageTypeRouterPath, _controllers.collectionController.getCollectionImage);
router.put(_constant.addTagToCollectionRouterPath, [_auth.passportAuth], _controllers.collectionController.addTagToCollection);
router.put(_constant.updateCollectionRouterPath, [_auth.passportAuth], _controllers.collectionController.updateCollection);
router.delete(_constant.deleteCollectionRouterPath, [_auth.passportAuth], _controllers.collectionController.deleteCollection);