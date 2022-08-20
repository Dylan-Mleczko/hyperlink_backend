import { User } from '../../models';

export const deleteById = async ({ userId, realDelete = false }) => {
  console.log('received data: ', userId, realDelete);
  if (!realDelete) {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: {
        active: false,
        updated_at: new Date(),
      },
    });
    console.log(`Deleted user by Id: ${userId}, User: ${JSON.stringify(updatedUser)}`);
    return updatedUser;
  }

  const deletedUser = await User.findByIdAndDelete(userId);
  console.log(`Deleted user by Id: ${userId}, User: ${JSON.stringify(deletedUser)}`);
  return deletedUser;
};
