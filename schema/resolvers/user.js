import {
  User,
  Users,
  CreateUser,
  DeleteUser,
  UpdateUsername,
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
  },
};
