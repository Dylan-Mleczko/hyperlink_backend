/* eslint-disable complexity */
import { isNilOrEmpty } from 'ramda-adjunct';
import { User } from '../../models';

export const update = async (userId, props) => {
  const user = await User.findById(userId);
  if (isNilOrEmpty(user)) {
    console.log(`Cannot find user with id: ${userId}`);
    return undefined;
  }

  if (props.active !== undefined) {
    user.active = props.active;
  }

  if (props.email) {
    user.email = props.email;
  }

  if (props.password) {
    user.password = props.password;
  }

  if (props.first_name) {
    user.name.first = props.first_name;
  }

  if (props.last_name) {
    user.name.last = props.last_name;
  }

  await user.save();

  const updatedUser = await User.findById(userId);

  return updatedUser;
};
