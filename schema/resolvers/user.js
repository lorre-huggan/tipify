import {
  User,
  Users,
  CreateUser,
  DeleteUser,
  UpdateUsername,
  LoginUser,
  UpdatePassword,
} from '../../controllers/user.js';

export const userResolvers = {
  Query: {
    Users,
    User,
  },

  Mutation: {
    CreateUser,
    DeleteUser,
    LoginUser,
    UpdateUsername,
    UpdatePassword,
  },
};
