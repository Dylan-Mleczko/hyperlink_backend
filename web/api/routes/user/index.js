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
router.post(_constant.registerRouterPath, _controllers.userController.registerUser);
router.post(_constant.loginRouterPath, _controllers.userController.login);
router.get(_constant.logoutRouterPath, [_auth.passportAuth], _controllers.userController.logout);
router.post(_constant.startResestPassword, _controllers.userController.startResestPassword);
router.post(_constant.endResestPassword, _controllers.userController.endResestPassword);
router.post(_constant.checkEmailExists, _controllers.userController.checkEmailExists);
router.get(_constant.allUserRouterPath, [_auth.passportAuth], _controllers.userController.getAllUser);
router.get(_constant.getUserRouterPath, [_auth.passportAuth], _controllers.userController.getUser);
router.post(_constant.updateUserRouterPath, [_auth.passportAuth], _controllers.userController.updateUser);
router.delete(_constant.deleteUserRouterPath, [_auth.passportAuth], _controllers.userController.deleteUser);