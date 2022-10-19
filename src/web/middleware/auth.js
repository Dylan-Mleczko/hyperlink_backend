/* eslint-disable complexity */

export const passportAuth = (req, res, next) => {
  console.log('--- Middleware passport authentication ---');
  console.log(
    '---------------------------- Access-Token Found in Request Cookie: ' +
      req.cookies['access_token']
  );

  if (!req.passport) {
    console.log('Passport is null!');
    return next();
  }
  return req.passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log(JSON.stringify(info));
    if (!user) {
      return res.status(401).send('Access denied.');
    }
    if (err) {
      return next(err);
    }
    console.log(`Authentication success.\n ${JSON.stringify(info)}`);
    req.tokenInfo = info;
    req.user = user;
    return next();
  })(req, res, next);
};
