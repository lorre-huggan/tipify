import { UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import { UserModel } from '../model/user.js';

const emailRegEx =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

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
export const signupValidate = (password, confirmPassword, username, email) => {
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

  if (!confirmPassword || password !== confirmPassword) {
    throw new UserInputError('password invalid', {
      error: {
        password: 'Passwords dont match',
      },
    });
  }

  if (!email || typeof email !== 'string') {
    throw new UserInputError('email invalid', {
      error: {
        password: 'email invalid',
      },
    });
  }

  if (!emailRegEx.test(email)) {
    throw new UserInputError('email invalid', {
      error: {
        password: 'email credentials invalid',
      },
    });
  }
  if (!username || typeof username !== 'string') {
    throw new UserInputError('username invalid', {
      error: {
        password: 'username invalid',
      },
    });
  }
};
export const newUsernameValidate = (username) => {
  if (!username || typeof username !== 'string') {
    throw new UserInputError('username invalid', {
      error: {
        password: 'username invalid',
      },
    });
  }
};

export const passwordValidate = async (password, user) => {
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UserInputError('Wrong password or email');
  }
};
