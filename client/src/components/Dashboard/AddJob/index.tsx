import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_JOB, GET_USER_JOBS } from '../../../gql/request/job/request';
import { UserJob, UserJobs } from '../../../types/job-types';
import { AuthUser } from '../../../types/user-types';
import './styles.scss';

type Props = {
  data: UserJobs | undefined;
  user: AuthUser;
};

interface AddValues {
  company_name: string;
  job_title: string;
}

const AddJob: React.FC<Props> = ({ data, user }) => {
  const [error, setError] = useState<string>('');
  const [values, setValues] = useState<AddValues>({
    company_name: '',
    job_title: '',
  });

  const [CreateJob, { loading }] = useMutation(CREATE_JOB, {
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
    CreateJob({
      variables: {
        input: {
          company_name: values.company_name,
          job_title: values.job_title,
          user: user.username,
        },
      },
      refetchQueries: [
        { query: GET_USER_JOBS, variables: { user: user.username } },
      ],
    });
  };

  return (
    <div className="add-job-container">
      <div className="add-job">
        <small className="add-job-username">{user.username}</small>
        <h3 className="add-job-heading">Create Job</h3>
        <form className="add-job-form" onSubmit={handleSubmit}>
          <label>Company</label>
          <input
            name="company_name"
            type="text"
            value={values.company_name}
            onChange={handleChange}
            autoComplete="off"
          />
          <label>Job Title</label>
          <input
            name="job_title"
            type="text"
            value={values.job_title}
            onChange={handleChange}
            autoComplete="off"
          />
          <button disabled={loading}>ADD</button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
