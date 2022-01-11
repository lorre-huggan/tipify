import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../../gql/request/user/request';

interface Props {}

const Login = (props: Props) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [LoginUser, { data }] = useMutation(USER_LOGIN);

  const { username, password } = values;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoginUser({ variables: { username, password } });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          placeholder="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="submit">click</button>
      </form>
    </section>
  );
};

export default Login;
