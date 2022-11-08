/* eslint-disable no-unused-vars */
import Joi from 'joi';
import mongoose from 'mongoose';

import * as userService from '../../../../services/user';
import { auth, revokeToken } from '../../../../services/auth';
import { sendEmail } from '../../../../utils/email/index';
import { isHashedPassword, hashPassword } from '../../../../services/auth';

export const registerUser = async (req, res) => {
  const data = req.body.data;
  const userDetails = data.userDetails;
  const authInfo = data.authInfo;

  console.log(`userDetails: ${data.userDetails} authInfo: ${data.authInfo}`);

  // data validation
  const userDetailSchema = Joi.object().keys({
    firstName: Joi.string().min(0).max(99).required(),
    lastName: Joi.string().min(0).max(99).required(),
  });

  const authInfoSchema = Joi.object().keys({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const patientDetailError = userDetailSchema.validate(userDetails).error;
  const authInfoError = authInfoSchema.validate(authInfo).error;

  if (!(patientDetailError == null) || !(authInfoError == null)) {
    const errorMsg = patientDetailError
      ? patientDetailError.details[0].message
      : authInfoError.details[0].message;
    console.log(errorMsg);
    res.status(422).json({
      message: errorMsg,
      data: null,
    });
    return;
  }

  // create new user with authInfo and patient type and id
  const newUser = await userService.create({
    email: authInfo.email,
    first_name: userDetails.firstName,
    last_name: userDetails.lastName,
    password: authInfo.password,
  });

  console.log(`newUser: ${newUser}`);
  if (newUser == null) {
    res.status(422).json({
      message: 'failed to create user',
      data: null,
    });
    return;
  }

  res.json({ data: { user: newUser } });
};

export const getAllUser = async (_, res) => {
  const users = await userService.readAll();
  res.json({ data: { users } });
};

export const getUser = async (req, res) => {
  const user = await userService.readById(req.user._id);
  const result = { email: user?.email, name: user?.name };
  res.json({ user: result });
};

export const updateUser = async (req, res) => {
  console.log(req.body);
  const newUser = await userService.update(req.user._id, req.body.userDetails);
  res.json({ newUser });
};

export const deleteUser = async (req, res) => {
  const newUser = await userService.deleteById({ userId: req.params.id });
  res.json({ data: { newUser } });
};

export const login = async (req, res) => {
  // const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
  console.log('IP:' + req.ip);
  // logger.debug('', req.body);
  console.log(req.body);
  const { email, password } = req.body.data;
  const authResult = await auth({
    email: email,
    password: password,
  });
  console.log('--- User Authentication ---');
  if (authResult.token) {
    const user = authResult.user;
    console.log(`Authentication success. Email: ${email}, Token:${authResult.token}`);
    // res.cookie('token', '123456');
    // res.cookie('token', authResult.token, { httpOnly: true });

    return res
      .cookie('access_token', authResult.token)
      .status(200)
      .json({
        user: { name: user.name, email: user.email, id: user._id, token: authResult.token },
      });
  } else {
    // 401，Authorization Fail
    console.log(
      `Authentication fail. Email: ${email}, Password: ${password}, ErrorMessage: ${authResult.errorMessage}`
    );
    return res.status(401).json({
      error: 'Unauthorized',
      message: authResult.errorMessage,
    });
  }
};

export const logout = async (req, res) => {
  console.log('--- User Router [passportAuth]---');
  try {
    // const token = req.cookies['access_token'];

    // logger.debug(usersRouterPath);
    // console.log(`token info: ${JSON.stringify(token)}`);
    console.log('logout: ' + req.user._id);
    await revokeToken(req.user);
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (err) {
    return res.status(401).json({
      error: err,
    });
  }
};

export const checkEmailExists = async (req, res) => {
  const email = req.body.data;

  const data = await userService.readByEmail(email);

  if (data) {
    return res.status(409).json({
      error: 'Email exists',
      message: `User with email ${email} exists`,
    });
  } else {
    return res.status(200).json('Success');
  }
};

export const startResestPassword = async (req, res) => {
  const { email } = req.body.data;

  const data = await userService.readByEmail(email);

  // check if valid email, send email for reset then
  if (data) {
    await sendEmail(email);
    return res.status(200).json('Email sent');
  } else {
    console.log(`User with email ${email} does not exist`);
    return res.status(404).json({
      error: 'Unauthorized',
      message: `User with email ${email} does not exist`,
    });
  }
};

export const endResestPassword = async (req, res) => {
  try {
    const { email, password } = req.body.data;

    const user = await userService.readByEmail(email);

    let hashedPassword = password;
    const isHashed = await isHashedPassword(password);
    if (!isHashed) {
      hashedPassword = await hashPassword(password);
    }

    user.password = hashedPassword;

    user.save();

    console.log(`Password updated to ${password}`);

    return res.status(200).json('Password Reset successful');
  } catch (err) {
    return res.status(404).json({
      error: err,
    });
  }
};
