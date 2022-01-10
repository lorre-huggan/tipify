import { UserModel } from '../model/user.js';
import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { loginValidate, signupValidate } from '../utils.js/form_validate.js';
import { checkAuth } from '../utils.js/check_auth.js';
dotenv.config();

export const Users = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

export const User = async (parent, { id }, context, info) => {
  try {
    const user = await UserModel.findById({ _id: id });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const CreateUser = async (parent, args) => {
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

export const LoginUser = async (parent, { input }) => {
  const { username, password } = input;

  loginValidate(username, password);

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new UserInputError('Wrong credentials');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UserInputError('Wrong password or email');
  }

  const token = createToken(user);

  return {
    ...user._doc,
    id: user._id,
    token,
  };
};

export const DeleteUser = async (parent, { input }, context) => {
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

export const UpdateUsername = async (parent, { input }) => {
  const { _id, new_username } = input;

  const user = await UserModel.findOne({ username: new_username });

  if (user) {
    throw new UserInputError('username is taken', {
      error: {
        username: 'This username is taken...',
      },
    });
  }

  try {
    const newUser = UserModel.findByIdAndUpdate(_id, {
      username: new_username,
    });
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

// TODO change password controller

//Helper function
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT,
    { expiresIn: '1h' }
  );
};
