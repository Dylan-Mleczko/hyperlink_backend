"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.startResestPassword = exports.registerUser = exports.logout = exports.login = exports.getUser = exports.getAllUser = exports.endResestPassword = exports.deleteUser = exports.checkEmailExists = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var userService = _interopRequireWildcard(require("../../../../services/user"));

var _auth = require("../../../../services/auth");

var _index = require("../../../../utils/email/index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var registerUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var data = req.body.data;
    var userDetails = data.userDetails;
    var authInfo = data.authInfo;
    console.log("userDetails: ".concat(data.userDetails, " authInfo: ").concat(data.authInfo)); // data validation

    var userDetailSchema = _joi.default.object().keys({
      firstName: _joi.default.string().min(0).max(99).required(),
      lastName: _joi.default.string().min(0).max(99).required()
    });

    var authInfoSchema = _joi.default.object().keys({
      email: _joi.default.string().min(5).max(255).required().email(),
      password: _joi.default.string().min(5).max(255).required()
    });

    var patientDetailError = userDetailSchema.validate(userDetails).error;
    var authInfoError = authInfoSchema.validate(authInfo).error;

    if (!(patientDetailError == null) || !(authInfoError == null)) {
      var errorMsg = patientDetailError ? patientDetailError.details[0].message : authInfoError.details[0].message;
      console.log(errorMsg);
      res.status(422).json({
        message: errorMsg,
        data: null
      });
      return;
    } // create new user with authInfo and patient type and id


    var newUser = yield userService.create({
      email: authInfo.email,
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      password: authInfo.password
    });
    console.log("newUser: ".concat(newUser));

    if (newUser == null) {
      res.status(422).json({
        message: 'failed to create user',
        data: null
      });
      return;
    }

    res.json({
      data: {
        user: newUser
      }
    });
  });

  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.registerUser = registerUser;

var getAllUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (_, res) {
    var users = yield userService.readAll();
    res.json({
      data: {
        users
      }
    });
  });

  return function getAllUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllUser = getAllUser;

var getUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var user = yield userService.readById(req.user._id);
    var result = {
      email: user.email,
      name: user.name
    };
    res.json({
      user: result
    });
  });

  return function getUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    console.log(req.body);
    var newUser = yield userService.update(req.user._id, req.body.userDetails);
    res.json({
      newUser
    });
  });

  return function updateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var newUser = yield userService.deleteById({
      userId: req.params.id
    });
    res.json({
      data: {
        newUser
      }
    });
  });

  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var login = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    // const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
    console.log('IP:' + req.ip); // logger.debug('', req.body);

    console.log(req.body);
    var {
      email,
      password
    } = req.body.data;
    var authResult = yield (0, _auth.auth)({
      email: email,
      password: password
    });
    console.log('--- User Authentication ---');

    if (authResult.token) {
      var user = authResult.user;
      console.log("Authentication success. Email: ".concat(email, ", Token:").concat(authResult.token)); // res.cookie('token', '123456');
      // res.cookie('token', authResult.token, { httpOnly: true });

      return res.cookie('access_token', authResult.token).status(200).json({
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          token: authResult.token
        }
      });
    } else {
      // 401，Authorization Fail
      console.log("Authentication fail. Email: ".concat(email, ", Password: ").concat(password, ", ErrorMessage: ").concat(authResult.errorMessage));
      return res.status(401).json({
        error: 'Unauthorized',
        message: authResult.errorMessage
      });
    }
  });

  return function login(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.login = login;

var logout = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    console.log('--- User Router [passportAuth]---');

    try {
      var token = req.cookies['access_token']; // logger.debug(usersRouterPath);

      console.log("token info: ".concat(JSON.stringify(token)));
      yield (0, _auth.revokeToken)(token);
      res.clearCookie('access_token').status(200).json({
        message: 'Successfully logged out'
      });
    } catch (err) {
      return res.status(404).json({
        error: err
      });
    }
  });

  return function logout(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.logout = logout;

var checkEmailExists = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    var email = req.body.data;
    var data = yield userService.readByEmail(email);

    if (data) {
      return res.status(409).json({
        error: 'Email exists',
        message: "User with email ".concat(email, " exists")
      });
    } else {
      return res.status(200).json('Success');
    }
  });

  return function checkEmailExists(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.checkEmailExists = checkEmailExists;

var startResestPassword = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    var {
      email
    } = req.body.data;
    var data = yield userService.readByEmail(email); // check if valid email, send email for reset then

    if (data) {
      yield (0, _index.sendEmail)(email);
      return res.status(200).json('Email sent');
    } else {
      console.log("User with email ".concat(email, " does not exist"));
      return res.status(404).json({
        error: 'Unauthorized',
        message: "User with email ".concat(email, " does not exist")
      });
    }
  });

  return function startResestPassword(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.startResestPassword = startResestPassword;

var endResestPassword = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        email,
        password
      } = req.body.data;
      var user = yield userService.readByEmail(email);
      var hashedPassword = password;
      var isHashed = yield (0, _auth.isHashedPassword)(password);

      if (!isHashed) {
        hashedPassword = yield (0, _auth.hashPassword)(password);
      }

      user.password = hashedPassword;
      user.save();
      console.log("Password updated to ".concat(password));
      return res.status(200).json('Password Reset successful');
    } catch (err) {
      return res.status(404).json({
        error: err
      });
    }
  });

  return function endResestPassword(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.endResestPassword = endResestPassword;