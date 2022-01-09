import { UserInputError } from 'apollo-server';

const emailRegEx =
  /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export const passwordValidate = (password, confirmPassword) => {
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
};

export const emailValidate = (email) => {
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
};

export const usernameValidate = (username) => {
  if (!username || typeof username !== 'string') {
    throw new UserInputError('username invalid', {
      error: {
        password: 'username invalid',
      },
    });
  }
};
