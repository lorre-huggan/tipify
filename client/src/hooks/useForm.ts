import { useState } from 'react';
import { LoginInput, LoginUser } from '../types/user-types';

export const useForm = (fn: any, state: LoginInput) => {
  const [values, setValues] = useState(state);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fn();
  };
  return {
    handleChange,
    handleSubmit,
    values,
    error,
    setError,
  };
};
