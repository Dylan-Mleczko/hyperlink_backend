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
router.post(_constant.newTagRouterPath, [_auth.passportAuth], _controllers.tagController.addTag);
router.get(_constant.getTagRouterPath, [_auth.passportAuth], _controllers.tagController.getTag);
router.put(_constant.updateTagRouterPath, [_auth.passportAuth], _controllers.tagController.updateTag);
router.delete(_constant.deleteTagRouterPath, [_auth.passportAuth], _controllers.tagController.deleteTag);