import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    LoginUser(username: $username, password: $password) {
      _id
      email
      username
      token
    }
  }
`;
export const USER_SIGN_UP = gql`
  mutation signup(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $currency: String!
  ) {
    CreateUser(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      currency: $currency
    ) {
      _id
      email
      username
      token
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    Users {
      email
      username
    }
  }
`;

export const GET_USER = gql`
  query Users($userId: String!) {
    User(id: $userId) {
      id
      email
      email
      username
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($deleteUserId: String!) {
    DeleteUser(id: $deleteUserId) {
      _id
    }
  }
`;
