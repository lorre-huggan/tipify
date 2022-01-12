import { LoginUser } from '../../types/user-types';

export const userInitialState: LoginUser = {
  _id: '',
  email: '',
  username: '',
  token: '',
  __typename: '',
};

interface Action extends LoginUser {
  type: string;
}

export const userReducer = (state: LoginUser, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        _id: action._id,
        email: action.email,
        username: action.username,
        token: action.token,
        __typename: action.__typename,
      };
    default:
      return state;
  }
};
