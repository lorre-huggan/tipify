import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../context/user/userProvider';
import { AuthUser } from '../types/user-types';

export const UseAuth = () => {
  const [{ authUser }, dispatch] = useUserState();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken: AuthUser = jwtDecode(localStorage.getItem('token')!);
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
