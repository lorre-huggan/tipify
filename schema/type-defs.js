import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    currency: Currency!
    jobs: [ID!]
    createdAt: String!
    token: String!
  }

  type Job {
    _id: ID!
    company_name: String!
    job_title: String!
    wages: [Wage]
    user: ID!
    username: String!
    createdAt: String!
    updatedAt: String
  }

  type Wage {
    tips: Float!
    hours_worked: Int!
    date: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    currency: Currency!
    password: String!
    confirmPassword: String!
  }

  input UpdateUsernameInput {
    _id: ID!
    new_username: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input JobInput {
    company_name: String!
    job_title: String!
    wages: [WageInput]
  }

  input WageInput {
    tips: Float!
    hours_worked: Int!
    date: String!
  }

  type Query {
    Users: [User!]!
    User(id: ID!): User!
    Jobs: [Job!]
    Job(id: ID!): Job!
  }

  type Mutation {
    LoginUser(input: LoginInput!): User!
    CreateUser(input: CreateUserInput!): User!
    DeleteUser(input: ID!): User!
    UpdateUsername(input: UpdateUsernameInput!): User!
    CreateJob(input: JobInput!): Job!
    UpdateJob(input: JobInput!, id: ID!): Job!
    DeleteJob(input: ID!): Job!
  }

  enum Currency {
    GBP
    EUR
    USD
  }
`;
