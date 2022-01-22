import React, { useEffect, useState } from 'react';
import ResponsiveDatePicker from '../DatePicker';
import { getUnixTime } from 'date-fns';
import './styles.scss';
import { useMutation } from '@apollo/client';
import { CREATE_SHIFT } from '../../gql/request/job/request';
import Card from '../Card';

interface Props {
  user: string;
}

interface AddValues {
  tips: number;
  hours_worked: number;
}

const AddShift: React.FC<Props> = ({ user }) => {
  const [date, setDate] = useState<any>(new Date());
  const [values, setValues] = useState<AddValues>({
    tips: 0,
    hours_worked: 1,
  });
  const [error, setError] = useState<string>('');

  const [CreateShift, { loading }] = useMutation(CREATE_SHIFT, {
    update(proxy) {
      console.log('done');
    },
    onError(error) {
      console.log(error.message);
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
      <div className="add-shift-container">
        <div className="add-shift-heading">
          <h2>Add Shift</h2>
        </div>
        <form className="add-shift-form" onSubmit={handleSubmit}>
          <label>Enter Date</label>
          <ResponsiveDatePicker setDate={setDate} />
          <label>Tips</label>
          <input
            name="tips"
            type="number"
            value={values.tips}
            onChange={handleChange}
            autoComplete="off"
            step="any"
            min="0.01"
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
          <button>ADD</button>
        </form>
      </div>
    </Card>
  );
};

export default AddShift;
