import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_SIGN_UP } from '../../gql/request/user/request';
import './styles.scss';
import { useNavigate, Link } from 'react-router-dom';
import LoadingBox from '../../components/Loading';
import { useUserState } from '../../context/user/userProvider';
import { UseAuth } from '../../hooks/useAuth';
import { AuthUser } from '../../types/user-types';

interface Props {}

const SignUp: React.FC<Props> = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    currency: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [{}, dispatch] = useUserState();
  const { authUser }: { authUser: AuthUser } = UseAuth();

  if (authUser.id) {
    navigate('/dashboard');
  }

  const [CreateUser, { loading }] = useMutation(USER_SIGN_UP, {
    update(_, { data: { CreateUser } }) {
      //TODO handle loading event...
      localStorage.setItem('token', CreateUser.token);
      dispatch({
        type: 'LOGIN',
        userData: CreateUser,
      });

      navigate('/dashboard');
    },
    onError(error) {
      setError(error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const { username, email, password, confirmPassword, currency } = values;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateUser({
      variables: { username, email, password, confirmPassword, currency },
    });
  };

  return (
    <section className="login-container">
      <div className="login-form-container">
        <div className="login-heading">
          <span className="login-logo">TIPiFY</span>
          <h1>Welcome</h1>
          {loading && <LoadingBox />}
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
            <label>Email</label>
            <input
              className={error ? 'login-input-error' : ''}
              name="email"
              type="email"
              value={values.email}
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
            <label>Re-Type Password</label>
            <input
              className={error ? 'login-input-error' : ''}
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Select Your Currency</label>
            <div className="sign-up-radio-container">
              <div>
                <label htmlFor="GBP">GBP</label>
                <input
                  className={error ? 'login-input-error' : ''}
                  name="currency"
                  type="radio"
                  id="GBP"
                  value="GBP"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="USD">USD</label>
                <input
                  className={error ? 'login-input-error' : ''}
                  name="currency"
                  type="radio"
                  id="USD"
                  value="USD"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="EUR">EUR</label>
                <input
                  className={error ? 'login-input-error' : ''}
                  name="currency"
                  type="radio"
                  id="EUR"
                  value="EUR"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>
            {error && <p className="login-error">{error}!</p>}
            <button type="submit" disabled={loading}>
              Sign Up
            </button>
          </form>
          <p>
            Already han an account?{' '}
            <span>
              <Link to={'/login'}>Login</Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
