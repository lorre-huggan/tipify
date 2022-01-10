import { gql } from 'apollo-server';
import { jobTypeDefs } from './job_type_defs.js';
import { userTypeDefs } from './user_type_defs.js';

export const typeDefs = gql`
  ${userTypeDefs}
  ${jobTypeDefs}

  type Query
  type Mutation
`;
