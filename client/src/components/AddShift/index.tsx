import React, { useState } from 'react';
import './styles.scss';

interface Props {}

interface AddValues {
  tips: number;
  hours_worked: number;
  date: number;
  _id: string;
}

const AddShift: React.FC<Props> = () => {
  const [values, setValues] = useState<AddValues>({
    tips: 0,
    hours_worked: 0,
    date: 0,
    _id: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log(values);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="add-shift-container">
      <div className="add-shift-heading">
        <h2>Add Shift</h2>
      </div>
      <form className="add-shift-form">
        <label>Tips</label>
        <input
          name="tips"
          type="number"
          value={values.tips}
          onChange={handleChange}
          autoComplete="off"
        />
        <label>Hours</label>
        <input
          name="hours"
          type="number"
          value={values.hours_worked}
          onChange={handleChange}
          autoComplete="off"
        />
        <button>ADD</button>
      </form>
    </div>
  );
};

export default AddShift;
