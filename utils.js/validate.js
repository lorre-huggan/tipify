import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';

const emailRegEx =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const usernameRegEx = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/;

export const loginValidate = (username, password) => {
  if (!username || typeof username !== 'string') {
    throw new UserInputError('username invalid', {
      error: {
        password: 'username invalid',
      },
    });
  }

  if (!password || typeof password !== 'string') {
    throw new UserInputError('password invalid', {
      error: {
        password: 'password invalid',
      },
    });
  }

  if (password.length < 6) {
    throw new UserInputError('password invalid', {
      error: {
        password: 'Password length must be 6 or more characters long',
      },
    });
  }
};
export const signupValidate = (
  password,
  confirmPassword,
  username,
  email,
  currency
) => {
  if (!currency || typeof currency !== 'string') {
    throw new UserInputError('please select currency ');
  }
  if (!password || typeof password !== 'string') {
    throw new UserInputError('password invalid');
  }

  if (password.length < 6) {
    throw new UserInputError('password must be 6 or mor characters long');
  }

  if (!confirmPassword || password !== confirmPassword) {
    throw new UserInputError('passwords dont match please retry');
  }

  if (!emailRegEx.test(email)) {
    throw new UserInputError('Email is not valid');
  }

  if (!usernameRegEx.test(username)) {
    throw new UserInputError(
      'Username must be between 3-15 characters. Letters and numbers only '
    );
  }
};

export const newUsernameValidate = (username) => {
  if (!username || typeof username !== 'string') {
    throw new UserInputError('username invalid');
  }
};

export const passwordValidate = async (password, user) => {
  const pwCheck = await bcrypt.compare(password, user.password);

  if (!pwCheck) {
    throw new UserInputError('Very Bad Credentials');
  }
};
