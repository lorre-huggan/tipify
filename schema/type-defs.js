import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    currency: Currency!
    jobs: [Job!]
    createdAt: Int!
    token: String!
  }

  type Job {
    _id: ID!
    company_name: String!
    job_title: String!
    wages: [Wage]
  }

  type Wage {
    tips: Float!
    hours_worked: Int!
    date: Int!
  }

  type Query {
    Users: [User!]!
    User(id: ID!): User!
    Job: [Job!]
  }

  input CreateUserInput {
    username: String!
    email: String!
    currency: Currency!
    password: String!
    confirmPassword: String!
  }

  input UpdateUserInput {
    _id: ID!
    new_username: String!
  }

  type Mutation {
    CreateUser(input: CreateUserInput!): User!
    DeleteUser(input: ID!): [User!]!
    UpdateUsername(input: UpdateUserInput!): User!
  }

  enum Currency {
    GBP
    EUR
    USD
  }
`;
