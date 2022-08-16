import { isNilOrEmpty } from 'ramda-adjunct';
import { isMongoId } from 'validator';
import { User } from '../../models';

export const readById = async (userId) => {
  if (!isMongoId(`${userId}`)) {
    console.log(`Invalid userId ${userId}`);
    return undefined;
  }
  const user = await User.findById(userId);

  if (isNilOrEmpty(user)) {
    console.log(`Cannot find user with id: ${userId}`);
  }

  return user;
};

export const readByEmail = async (email) => {
  const user = await User.findOne({ email, activeStatus: true });

  if (isNilOrEmpty(user)) {
    console.log(`Cannot find user with email:  ${email}`);
    return undefined;
  }

  return user;
};

export const readByJTI = async (jti) => {
  const user = await User.findOne({ jti, active: true });

  if (isNilOrEmpty(user)) {
    console.log(`Cannot find user with jti:  ${jti}`);
    return undefined;
  }

  return user;
};
