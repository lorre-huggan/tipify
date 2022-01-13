import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../context/user/userProvider';

export interface Token {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export const UseAuth = () => {
  const [{ authUser }, dispatch] = useUserState();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken: Token = jwtDecode(localStorage.getItem('token')!);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
      } else {
        dispatch({
          type: 'AUTH',
          authUser: decodedToken,
        });
      }
    } else {
      navigate('/login');
    }
  }, [dispatch]);
  return { authUser };
};
