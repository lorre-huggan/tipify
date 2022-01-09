import { userData } from '../fakedata.js';
import { UserModel } from '../model/user.js';
import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from '../utils.js/formValidate.js';
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

  usernameValidate(username);
  emailValidate(email);
  passwordValidate(password, confirmPassword);

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
    const token = jwt.sign(
      {
        id: res._id,
        email: res.email,
        username: res.username,
      },
      process.env.JWT,
      { expiresIn: '1h' }
    );
    return {
      ...res._doc,
      id: res._id,
      token,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateUsername = async (parent, { input }) => {
  const { _id, newUsername } = input;
  try {
    UserModel.findByIdAndUpdate(_id, { username: newUsername });
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteUser = (parent, { input }) => {
  const update = userData.filter((user) => user._id !== input);
  return update;
};
