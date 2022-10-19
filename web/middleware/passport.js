"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewarePassport = void 0;

var _config = _interopRequireDefault(require("config"));

var _passportJwt = require("passport-jwt");

var _models = require("../../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authOpts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromExtractors([req => req.cookies['access_token'] // ExtractJwt.fromUrlQueryParameter('token'),
  // ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: _config.default.secrets.jwtPrivateKey,
  passReqToCallback: true
};
var jwtAuthConfig = new _passportJwt.Strategy(authOpts, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, jwtPayload, done) {
    // const user = await User.findOne({ email: jwtPayload.email }, '_id email name jti active').lean();
    var user = yield _models.User.findOne({
      email: jwtPayload.sub
    });
    if (!user) return done(null, false, jwtPayload);

    if (user.jti === jwtPayload.jti && user.active === true) {
      return done(null, user, jwtPayload);
    }

    if (!user.active) console.log("Passport authentication fail, user [".concat(jwtPayload.sub, "] is inactive."));
    if (user.jti !== jwtPayload.jti) console.log("Passport authentication fail, user [".concat(jwtPayload.sub, "] token has been revoked."));
    return done(null, false, jwtPayload);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

var middlewarePassport = passport => {
  passport.use(jwtAuthConfig);
};

exports.middlewarePassport = middlewarePassport;