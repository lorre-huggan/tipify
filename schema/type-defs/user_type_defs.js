export const userTypeDefs = `
  enum Currency {
    GBP
    EUR
    USD
  }
  
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    currency: Currency!
    createdAt: String!
    token: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    currency: Currency!
    password: String!
    confirmPassword: String!
  }

  extend type Query {
    Users: [User!]!
    User(id: ID!): User!
    
  }

  extend type Mutation {
    LoginUser(username: String!, password: String!): User!
    CreateUser(username: String!, email: String!, password: String! confirmPassword: String!, currency: String!): User!
    DeleteUser(id: ID!): User!
    UpdateUsername(username: String!, id: ID!): User!
    UpdatePassword(password: String!, newPassword: String!): User!
  }
`;
