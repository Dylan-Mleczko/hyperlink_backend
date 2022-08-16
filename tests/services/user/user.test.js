import config from 'config';
import '../../utils/db_test_setup_teardown';

import { User } from '../../../src/models';
import * as userService from '../../../src/services/user';
import * as authService from '../../../src/services/auth';

describe('UserService', () => {
  let user1 = null;
  let user2 = null;
  let user1Info = {};
  let user2Info = {};

  test('Create User - plaintext password', async () => {
    const userPassword = config.testing.user.login.password;
    expect(await authService.isHashedPassword(userPassword)).toBe(false);

    user1Info = {
      email: config.testing.user.login.email,
      first_name: 'San',
      last_name: 'Zhang',
      password: userPassword,
      active: true,
    };

    const userValidResult = await userService.validate({
      email: config.testing.user.login.email,
      password: userPassword,
    });

    expect(userValidResult.error).toBe(undefined);

    user1 = await userService.create(user1Info);
    const user1db = await User.findOne({ email: user1Info.email });

    user2Info = {
      email: 'li@test.io',
      first_name: 'Si',
      last_name: 'Li',
      password: userPassword,
      active: true,
    };
    expect(user1).not.toBeNull();
    expect(user1db).not.toBeNull();
    expect(user1db.email).toBe(user1Info.email);
    expect(user1db.email).toBe(user1Info.email);
    expect(user1db.name.first).toBe(user1Info.first_name);
    expect(user1db.name.last).toBe(user1Info.last_name);
    expect(user1db.active).toBe(true);
    expect(user1db.jti).not.toBeNull();
    expect(user1db.password).not.toBe(userPassword);
    // await expect(userService.comparePassword(userPassword, user1db.password)).resolves.toBe(true);
    // await expect(userService.comparePassword('', user1db.password)).resolves.toBe(false);
    expect(await authService.comparePassword(userPassword, user1db.password)).toBe(true);
    expect(await authService.comparePassword('', user1db.password)).toBe(false);
  });

  test('Create User - hashed password', async () => {
    const userPassword = config.testing.user.login.password;
    const hashedPassword = await authService.hashPassword(userPassword);
    expect(await authService.isHashedPassword(hashedPassword)).toBe(true);

    const userValidResult = await userService.validate({
      email: config.testing.user.login.email,
      password: userPassword,
    });
    expect(userValidResult.error).toBe(undefined);

    user2Info = {
      email: 'li@test.io',
      first_name: 'Si',
      last_name: 'Li',
      password: hashedPassword,
      active: true,
    };
    user2 = await userService.create(user2Info);
    const user2db = await User.findOne({ email: user2Info.email });

    expect(user2).not.toBeNull();
    expect(user2db).not.toBeNull();
    expect(user2db.email).toBe(user2Info.email);
    expect(user2db.email).toBe(user2Info.email);
    expect(user2db.name.first).toBe(user2Info.first_name);
    expect(user2db.name.last).toBe(user2Info.last_name);
    expect(user2db.active).toBe(true);
    expect(user2db.jti).not.toBeNull();
    expect(user2db.password).toBe(hashedPassword);
    // await expect(userService.comparePassword(userPassword, user2db.password)).resolves.toBe(true);
    // await expect(userService.comparePassword('', user2db.password)).resolves.toBe(false);
    expect(await authService.comparePassword(userPassword, user2db.password)).toBe(true);
    expect(await authService.comparePassword('', user2db.password)).toBe(false);
  });
});
