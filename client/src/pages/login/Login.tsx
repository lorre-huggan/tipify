import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../../gql/request/user/request';
import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../../components/Loading';
import { useUserState } from '../../context/user/userProvider';
import { UseAuth } from '../../hooks/useAuth';
import { AuthUser } from '../../types/user-types';

interface Props {}

interface Values {
  username: string;
  password: string;
}

const Login: React.FC<Props> = () => {
  const [values, setValues] = useState<Values>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [{}, dispatch] = useUserState();

  const { authUser }: { authUser: AuthUser } = UseAuth();

  if (localStorage.getItem('token')) {
    navigate('/dashboard');
  }

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
    <section className="login">
      <div className="login-form-container">
        <div className="login-heading">
          <Link to="/">
            <h1 className="login-logo">TIPiFY</h1>
          </Link>
          <h4>Welcome Back</h4>
          {loading && <LoadingBox />}
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
            <button
              className={error ? 'login-button shake-vertical' : 'login-button'}
              type="submit"
              disabled={loading}
            >
              login
            </button>
            <div style={{ height: '1rem', marginBottom: '0.25rem' }}>
              {error && <p className="form-error">{error}!</p>}
            </div>
          </form>
          <p>
            Need an account?{' '}
            <span>
              <Link to={'/signup'}>Register</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
