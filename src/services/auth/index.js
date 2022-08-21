/* eslint-disable no-underscore-dangle */
import config from 'config';
import jwt from 'jsonwebtoken';
import { User } from '../../models';
import { nanoid } from 'nanoid';
import { isNilOrEmpty } from 'ramda-adjunct';
import { compare, hash, getRounds } from 'bcrypt';

export const createToken = (user) => {
  const payload = {
    sub: user.email,
    name: user.name,
    jti: user.jti,
  };
  const expiresIn = '24h'; // 1h,1d
  const token = jwt.sign(payload, config.secrets.jwtPrivateKey, { expiresIn });
  return token;
};

export const decodeToken = (tokenString) => {
  let token = tokenString;
  if (!token) {
    console.log('No token provided.');
    return null;
  }
  if (token.substr(0, 7).toLowerCase() === 'bearer ') {
    token = token.substr(7); //  'Bearer TokenString...'
  }

  try {
    const decoded = jwt.verify(token, config.secrets.jwtPrivateKey);
    console.log(JSON.stringify(decoded));
    return decoded;
  } catch (ex) {
    console.log('Invalid token.');
    return null;
  }
};

export const revokeToken = async (token) => {
  // const token = decodeToken(tokenString);
  await User.updateOne({ _id: token._id }, { jti: nanoid(16) });
};

export const auth = async (loginInfo) => {
  // initDemoData();
  const user = await User.findOne({ email: loginInfo.email });
  if (!user) {
    // return res.status(400).send('Invalid email or password.');
    console.log(`Authentication fail by invalid email: ${loginInfo.email}.`);
    return {
      token: null,
      statusCode: 400,
      errorMessage: 'Invalid email.',
    };
  }
  // console.log(user.email);
  if (isNilOrEmpty(user.active) || !user.active) {
    console.log(`Authentication fail. User ${loginInfo.email} is inactive.`);
    return {
      token: null,
      statusCode: 400,
      errorMessage: 'Inactive user.',
    };
  }

  const validPassword = await compare(loginInfo.password, user.password);
  if (!validPassword) {
    console.log(`Authentication fail by email: ${loginInfo.email}, Invalid password.`);
    return {
      token: null,
      statusCode: 400,
      errorMessage: 'Invalid password.',
    };
  }

  await User.updateOne(
    { email: user.email },
    {
      $inc: { sign_in_count: 1 },
    }
  );

  console.log(`Authentication success by email: ${loginInfo.email}.`);
  // const token = user.generateAuthToken();
  const token = createToken(user);
  // return token;
  return {
    token,
    user,
  };
};

export const signJwtToken = (payload, expiresIn = '24h') =>
  jwt.sign(payload, config.secrets.jwtPrivateKey, { expiresIn });

export const hashPassword = async (rawPassword) => {
  const saltRounds = 10;
  const result = await hash(rawPassword, saltRounds);
  return result;
};

export const comparePassword = async (rawPassword, hashedPassword) => {
  const result = await compare(rawPassword, hashedPassword);
  return result;
};

export const isHashedPassword = async (password) => {
  try {
    getRounds(password);
    return true;
  } catch (ex) {
    return false;
  }
};
