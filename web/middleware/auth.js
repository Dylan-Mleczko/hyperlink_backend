"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportAuth = void 0;

/* eslint-disable complexity */
var passportAuth = (req, res, next) => {
  console.log('--- Middleware passport authentication ---');

  if (!req.passport) {
    console.log('Passport is null!');
    return next();
  }

  return req.passport.authenticate('jwt', {
    session: false
  }, (err, user, info) => {
    console.log(JSON.stringify(info));

    if (!user) {
      return res.status(401).send('Access denied.');
    }

    if (err) {
      return next(err);
    }

    console.log("Authentication success.\n ".concat(JSON.stringify(info)));
    req.tokenInfo = info;
    req.user = user;
    return next();
  })(req, res, next);
};

exports.passportAuth = passportAuth;