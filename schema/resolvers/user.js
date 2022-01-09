import {
  User,
  Users,
  CreateUser,
  DeleteUser,
  UpdateUsername,
  LoginUser,
} from '../../controllers/user.js';

export const userResolvers = {
  Query: {
    Users,
    User,
  },

  Mutation: {
    CreateUser,
    DeleteUser,
    UpdateUsername,
    LoginUser,
  },
};
