import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserState } from '../../context/user/userProvider';
import { USER_LOGIN } from '../../gql/request/user/request';

type Props = {};

interface Values {
  username: string;
  password: string;
}

const LoginForm = (props: Props) => {
  const [values, setValues] = useState<Values>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [{}, dispatch] = useUserState();
  const [LoginUser, { loading }] = useMutation(USER_LOGIN, {
    update(proxy, { data: { LoginUser } }) {
      //TODO handle loading event...

      localStorage.setItem('token', LoginUser.token);
      dispatch({
        type: 'LOGIN',
        userData: LoginUser,
      });

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
        <button
          className={error ? 'shake-vertical' : ''}
          type="submit"
          disabled={loading}
        >
          login
        </button>
      </form>
      <p>
        Need an account?{' '}
        <span>
          <Link to={'/signup'}>Register</Link>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
