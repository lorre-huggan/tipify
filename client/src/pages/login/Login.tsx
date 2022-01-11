import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../../gql/request/user/request';
import './styles.scss';

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
    <section className="login-container">
      <div className="login-form-container">
        <div className="login-heading">
          <span className="login-logo">TIPiFY</span>
          <h1>Welcome Back</h1>
          <p>We're so excited to see you back!</p>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <span>forgot password?</span>
            <button type="submit">login</button>
          </form>
          <p>
            Need an account? <span>Register</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
