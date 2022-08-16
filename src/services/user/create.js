/* eslint-disable camelcase */
import Joi from 'joi';
import { User } from '../../models';
import { nanoid } from 'nanoid';
import { isHashedPassword, hashPassword } from '../auth';

export const validate = async (loginInfo) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(loginInfo);
};

export const create = async ({ email, first_name, last_name, password, active = true }) => {
  let hashedPassword = password;
  // console.log(password);
  const isHashed = await isHashedPassword(password);
  if (!isHashed) {
    hashedPassword = await hashPassword(password);
  }

  var userData = {
    email,
    password: hashedPassword,
    name: {
      first: first_name,
      last: last_name,
    },
    jti: nanoid(16),
    created_at: Date.now(),
    updated_at: null,
    sign_in_count: 0,
    active,
  };

  const user = await User.create(userData);
  return user;
};
