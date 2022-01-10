import { UserModel } from '../model/user.js';
import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { JWT } from '../utils.js/check_auth.js';
import jwt from 'jsonwebtoken';
import {
  loginValidate,
  passwordValidate,
  signupValidate,
} from '../utils.js/validate.js';
import { checkAuth } from '../utils.js/check_auth.js';

export const Users = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

export const User = async (_, { id }) => {
  try {
    const user = await UserModel.findById({ _id: id });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const CreateUser = async (_, args) => {
  const { username, email, currency, password, confirmPassword } = args.input;

  signupValidate(password, confirmPassword, username, email);

  const user = await UserModel.findOne({ username });
  if (user) {
    throw new UserInputError('username is taken', {
      error: {
        username: 'This username is taken...',
      },
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      username,
      email,
      currency,
      password: hashedPassword,
      jobs: [],
      createdAt: Date.now(),
    });
    const res = await newUser.save();
    const token = createToken(res);
    return {
      ...res._doc,
      id: res._id,
      token,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const LoginUser = async (_, { username, password }) => {
  loginValidate(username, password);

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new UserInputError('Wrong credentials');
  }

  passwordValidate(password, user);

  const token = createToken(user);

  return {
    ...user._doc,
    id: user._id,
    token,
  };
};

export const DeleteUser = async (_, { input }, context) => {
  const user = checkAuth(context);
  if (user.id !== input) {
    throw new UserInputError('not authorized');
  }
  try {
    const remove = UserModel.findByIdAndDelete(input);
    return remove;
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateUsername = async (_, { input }, context) => {
  const user = checkAuth(context);
  const { _id, new_username } = input;

  const findUserWithNewUsername = await UserModel.findOne({
    username: new_username,
  });

  if (findUserWithNewUsername) {
    throw new UserInputError('username is taken', {
      error: {
        username: 'This username is taken...',
      },
    });
  }

  try {
    const newUserName = UserModel.findByIdAndUpdate(_id, {
      username: new_username,
    });
    return newUserName;
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdatePassword = async (_, { password, newPassword }, context) => {
  const user = checkAuth(context);

  if (!user) {
    throw new UserInputError('bad auth error');
  }

  const userInDb = await UserModel.findOne({ username: user.username });

  passwordValidate(password, userInDb);

  if (newPassword.length < 6) {
    return new UserInputError('password must be 6 or more characters long');
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const item = await UserModel.findByIdAndUpdate(user.id, {
      password: hashedPassword,
    });
    return item;
  } catch (error) {
    throw new UserInputError(error.message);
  }
};

//Helper function
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    JWT,
    { expiresIn: '1h' }
  );
};
