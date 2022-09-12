import config from 'config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../models';

const authOpts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies['access_token'],
    // ExtractJwt.fromUrlQueryParameter('token'),
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: config.secrets.jwtPrivateKey,
  passReqToCallback: true,
};

const jwtAuthConfig = new Strategy(authOpts, async (req, jwtPayload, done) => {
  // const user = await User.findOne({ email: jwtPayload.email }, '_id email name jti active').lean();
  const user = await User.findOne({ email: jwtPayload.sub });
  if (!user) return done(null, false, jwtPayload);

  if (user.jti === jwtPayload.jti && user.active === true) {
    return done(null, user, jwtPayload);
  }

  if (!user.active)
    console.log(`Passport authentication fail, user [${jwtPayload.sub}] is inactive.`);

  if (user.jti !== jwtPayload.jti)
    console.log(`Passport authentication fail, user [${jwtPayload.sub}] token has been revoked.`);

  return done(null, false, jwtPayload);
});

export const middlewarePassport = (passport) => {
  passport.use(jwtAuthConfig);
};
