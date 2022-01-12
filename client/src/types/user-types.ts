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
