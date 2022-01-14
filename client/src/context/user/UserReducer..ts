import { AuthUser, LoginUser } from '../../types/user-types';

export const userInitialState: UserInitState = {
  userData: {
    _id: '',
    email: '',
    username: '',
    token: '',
    __typename: '',
  },
  authUser: {
    id: '',
    email: '',
    username: '',
    iat: 0,
    exp: 0,
    createdAt: 0,
  },
};

interface Action extends UserInitState {
  type: string;
}
interface UserInitState {
  userData: LoginUser;
  authUser: AuthUser;
}

export const userReducer = (state: LoginUser, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.userData,
      };
    case 'LOGOUT':
      return {
        ...state,
        userData: null,
      };
    case 'AUTH':
      return {
        ...state,
        authUser: action.authUser,
      };
    default:
      return state;
  }
};
