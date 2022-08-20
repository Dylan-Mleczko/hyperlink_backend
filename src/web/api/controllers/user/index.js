import * as userService from '../../../../services/user';
import Joi from 'joi';

export const registerUser = async (req, res) => {
  const data = req.body;
  const userDetails = data.userDetails;
  const authInfo = data.authInfo;

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
  const user = await userService.readById(req.params.id);
  res.json({ data: { user } });
};

export const updateUser = async (req, res) => {
  const newUser = await userService.update(req.params.id, req.body.userDetails);
  res.json({ data: { newUser } });
};

export const deleteUser = async (req, res) => {
  const newUser = await userService.deleteById({ userId: req.params.id });
  res.json({ data: { newUser } });

export const loginUser = async (req, res) => {
  const { email, password } = req.body.data;

  const dummyUser = { name: 'test' };

  if (!email || !password) {
    return res.status(401).json('Incorrect form of submission');
  }

  // Remove the dummy ifs and Add check for user from db and compare passwords with bcrypt, as we would not be storing passwords in db rather hashes, upon doing that get the user returned by the db and res.send that user instead of dummy user
  if (email == 'test@test.com' && password == '12345678') {
    return res.send(dummyUser);
  } else {
    res.status(401).json('Invalid Email or Password');
  }

};
