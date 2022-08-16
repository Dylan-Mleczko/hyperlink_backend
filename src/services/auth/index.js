/* eslint-disable no-underscore-dangle */
import { compare, hash, getRounds } from 'bcrypt';

const hashPassword = async (rawPassword) => {
  const saltRounds = 10;
  const result = await hash(rawPassword, saltRounds);
  return result;
};

const comparePassword = async (rawPassword, hashedPassword) => {
  const result = await compare(rawPassword, hashedPassword);
  return result;
};

const isHashedPassword = async (password) => {
  try {
    getRounds(password);
    return true;
  } catch (ex) {
    return false;
  }
};

export { hashPassword, isHashedPassword, comparePassword };
