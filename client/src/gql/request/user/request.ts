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
