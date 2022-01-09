import { jobResolvers } from './job.js';
import { userResolvers } from './user.js';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...jobResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...jobResolvers.Mutation,
  },
};
