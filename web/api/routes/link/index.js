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
router.post(_constant.newLinkRouterPath, [_auth.passportAuth], _controllers.linkController.addLink);
router.get(_constant.allLinkRouterPath, [_auth.passportAuth], _controllers.linkController.getAllLink);
router.get(_constant.getLinkRouterPath, [_auth.passportAuth], _controllers.linkController.getLink);
router.put(_constant.updateLinkRouterPath, [_auth.passportAuth], _controllers.linkController.updateLink);
router.delete(_constant.deleteLinkRouterPath, [_auth.passportAuth], _controllers.linkController.deleteLink);