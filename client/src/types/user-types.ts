export interface User {
  LoginUser: LoginUser;
}
export interface LoginUser {
  _id: string;
  email: string;
  username: string;
  token: string;
  __typename: string;
}
export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
  createdAt: number;
}
