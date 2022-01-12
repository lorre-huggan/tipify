import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../../gql/request/user/request';
import './styles.scss';
import { useNavigate } from 'react-router-dom';

interface Props {}

const Login: React.FC<Props> = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [LoginUser, { data, loading }] = useMutation(USER_LOGIN, {
    update(proxy, result) {
      //TODO handle loading event...
      if (loading) {
        console.log('loading');
      }
      const { LoginUser } = result.data;
      navigate('/dashboard');
    },
    onError(error) {
      setError(error.message);
    },
  });

  const { username, password } = values;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
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
          {/* <p>Sign in we're so excited to see you back!</p> */}
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <label>username</label>
            <input
              className={error ? 'login-input-error' : ''}
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Password</label>
            <input
              className={error ? 'login-input-error' : ''}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <span>forgot password?</span>
            {error && <p className="login-error">{error}!</p>}
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
