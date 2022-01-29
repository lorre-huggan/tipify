import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_SIGN_UP } from '../../gql/request/user/request';
import './styles.scss';
import { useNavigate, Link } from 'react-router-dom';
import LoadingBox from '../../components/Loading';
import { useUserState } from '../../context/user/userProvider';

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
  const [{ authUser }, dispatch] = useUserState();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  const [CreateUser, { loading }] = useMutation(USER_SIGN_UP, {
    update: (_, { data: { CreateUser } }) => {
      //TODO handle loading event...
      localStorage.setItem('token', CreateUser.token);
      dispatch({
        type: 'LOGIN',
        userData: CreateUser,
      });

      navigate('/dashboard');
    },
    onError: (error) => {
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
    <section className="signup">
      <div className="signup-form-container">
        <div className="signup-heading">
          <Link to="/">
            <h1 className="signup-logo">TIPiFY</h1>
          </Link>
          <h4>Welcome</h4>
          {loading && <LoadingBox />}
          {/* <p>Sign in we're so excited to see you back!</p> */}
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <label>username</label>
            <input
              className={error ? 'form-input-error' : ''}
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Email</label>
            <input
              className={error ? 'form-input-error' : ''}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Password</label>
            <input
              className={error ? 'form-input-error' : ''}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
            />
            <label>Re-Type Password</label>
            <input
              className={error ? 'form-input-error' : ''}
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
                  className={error ? 'form-input-error' : ''}
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
                  className={error ? 'form-input-error' : ''}
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
                  className={error ? 'form-input-error' : ''}
                  name="currency"
                  type="radio"
                  id="EUR"
                  value="EUR"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <button
              className={
                error ? 'signup-button shake-vertical' : 'signup-button'
              }
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
            <div style={{ height: '1rem', marginBottom: '0.25rem' }}>
              {error && <p className="form-error">{error}!</p>}
            </div>
          </form>
          <p>
            Already have an account?{' '}
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
