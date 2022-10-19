"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signJwtToken = exports.revokeToken = exports.isHashedPassword = exports.hashPassword = exports.decodeToken = exports.createToken = exports.comparePassword = exports.auth = void 0;

var _config = _interopRequireDefault(require("config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../../models");

var _nanoid = require("nanoid");

var _ramdaAdjunct = require("ramda-adjunct");

var _bcrypt = require("bcrypt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createToken = user => {
  var payload = {
    sub: user.email,
    name: user.name,
    jti: user.jti
  };
  var expiresIn = '24h'; // 1h,1d

  var token = _jsonwebtoken.default.sign(payload, _config.default.secrets.jwtPrivateKey, {
    expiresIn
  });

  return token;
};

exports.createToken = createToken;

var decodeToken = tokenString => {
  var token = tokenString;

  if (!token) {
    console.log('No token provided.');
    return null;
  }

  if (token.substr(0, 7).toLowerCase() === 'bearer ') {
    token = token.substr(7); //  'Bearer TokenString...'
  }

  try {
    var decoded = _jsonwebtoken.default.verify(token, _config.default.secrets.jwtPrivateKey);

    console.log(JSON.stringify(decoded));
    return decoded;
  } catch (ex) {
    console.log('Invalid token.');
    return null;
  }
};

exports.decodeToken = decodeToken;

var revokeToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (token) {
    // const token = decodeToken(tokenString);
    yield _models.User.updateOne({
      _id: token._id
    }, {
      jti: (0, _nanoid.nanoid)(16)
    });
  });

  return function revokeToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.revokeToken = revokeToken;

var auth = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (loginInfo) {
    // initDemoData();
    var user = yield _models.User.findOne({
      email: loginInfo.email
    });

    if (!user) {
      // return res.status(400).send('Invalid email or password.');
      console.log("Authentication fail by invalid email: ".concat(loginInfo.email, "."));
      return {
        token: null,
        statusCode: 400,
        errorMessage: 'Invalid email.'
      };
    } // console.log(user.email);


    if ((0, _ramdaAdjunct.isNilOrEmpty)(user.active) || !user.active) {
      console.log("Authentication fail. User ".concat(loginInfo.email, " is inactive."));
      return {
        token: null,
        statusCode: 400,
        errorMessage: 'Inactive user.'
      };
    }

    var validPassword = yield (0, _bcrypt.compare)(loginInfo.password, user.password);

    if (!validPassword) {
      console.log("Authentication fail by email: ".concat(loginInfo.email, ", Invalid password."));
      return {
        token: null,
        statusCode: 400,
        errorMessage: 'Invalid password.'
      };
    }

    yield _models.User.updateOne({
      email: user.email
    }, {
      $inc: {
        sign_in_count: 1
      }
    });
    console.log("Authentication success by email: ".concat(loginInfo.email, ".")); // const token = user.generateAuthToken();

    var token = createToken(user); // return token;

    return {
      token,
      user
    };
  });

  return function auth(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.auth = auth;

var signJwtToken = function signJwtToken(payload) {
  var expiresIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '24h';
  return _jsonwebtoken.default.sign(payload, _config.default.secrets.jwtPrivateKey, {
    expiresIn
  });
};

exports.signJwtToken = signJwtToken;

var hashPassword = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (rawPassword) {
    var saltRounds = 10;
    var result = yield (0, _bcrypt.hash)(rawPassword, saltRounds);
    return result;
  });

  return function hashPassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.hashPassword = hashPassword;

var comparePassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (rawPassword, hashedPassword) {
    var result = yield (0, _bcrypt.compare)(rawPassword, hashedPassword);
    return result;
  });

  return function comparePassword(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.comparePassword = comparePassword;

var isHashedPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (password) {
    try {
      (0, _bcrypt.getRounds)(password);
      return true;
    } catch (ex) {
      return false;
    }
  });

  return function isHashedPassword(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.isHashedPassword = isHashedPassword;