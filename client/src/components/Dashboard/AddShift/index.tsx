import React, { useState } from 'react';
import ResponsiveDatePicker from '../../DateInput/DatePicker';
import { getUnixTime } from 'date-fns';
import './styles.scss';
import { useMutation } from '@apollo/client';
import { CREATE_SHIFT, GET_USER_JOBS } from '../../../gql/request/job/request';
import Card from '../../Card';
import { UseAuth } from '../../../hooks/useAuth';
import { AuthUser } from '../../../types/user-types';
import { UserJobs } from '../../../types/job-types';
import { handleCurrency } from '../../../utils/helpers';

interface Props {
  user: string;
}

interface AddValues {
  tips: number;
  hours_worked: number;
}

const AddShift: React.FC<Props> = ({ user }) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  const [date, setDate] = useState<any>(new Date());
  const [values, setValues] = useState<AddValues>({
    tips: 0,
    hours_worked: 1,
  });
  const [error, setError] = useState<string>('');

  const [CreateShift, { loading }] = useMutation(CREATE_SHIFT, {
    update: (proxy, { data: { CreateShift } }) => {
      //read data from cache
      const data: UserJobs | null = proxy.readQuery({
        query: GET_USER_JOBS,
        variables: { user: authUser?.username },
      });

      //write data back to cache
      proxy.writeQuery({ query: GET_USER_JOBS, data });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateShift({
      variables: {
        input: {
          tips: Number(values.tips),
          hours_worked: Number(values.hours_worked),
          date: getUnixTime(date),
          user: user,
        },
      },
    });
  };

  return (
    <Card>
      <div className="add-shift">
        <div className="add-shift-heading">
          <h2>Add Shift</h2>
        </div>
        <form className="add-shift-form" onSubmit={handleSubmit}>
          <label>Enter Date</label>
          <ResponsiveDatePicker setDate={setDate} />
          <label>{`${handleCurrency(authUser.currency)}tips`}</label>
          <input
            name="tips"
            type="number"
            value={values.tips}
            onChange={handleChange}
            autoComplete="off"
            step="any"
            min="0.00"
          />
          <label>Hours</label>
          <input
            name="hours_worked"
            type="number"
            value={values.hours_worked}
            onChange={handleChange}
            autoComplete="off"
            step="any"
            min="1"
            max="24"
          />
          <button className="add-shift-button" disabled={loading}>
            ADD
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </Card>
  );
};

export default AddShift;
