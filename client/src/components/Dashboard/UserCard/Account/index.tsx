import { useMutation } from '@apollo/client';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { DELETE_JOB, GET_USER_JOBS } from '../../../../gql/request/job/request';
import { UseAuth } from '../../../../hooks/useAuth';
import { UserJob, UserJobs } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import DeleteJobModal from '../Modal';
import './styles.scss';

type Props = {
  id: string;
  job: UserJob | undefined;
};

const Account: React.FC<Props> = ({ id, job }) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();

  const [DeleteJob, { loading }] = useMutation(DELETE_JOB, {
    update: (cache, { data: { CreateShift } }) => {
      //read data from cache
      const data: UserJobs | null = cache.readQuery({
        query: GET_USER_JOBS,
        variables: { user: authUser?.username },
      });

      //write data back to cache
      cache.writeQuery({ query: GET_USER_JOBS, data });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteJob = () => {
    DeleteJob({
      variables: { deleteJobId: id },
      refetchQueries: [
        { query: GET_USER_JOBS, variables: { user: authUser.username } },
      ],
    });
  };

  return (
    <div className="account">
      <h1 className="account-title">My Account</h1>
      <div className="account-job-remove">
        <p>{`Delete ${job?.company_name}`}</p>
        <DeleteJobModal
          handleDeleteJob={handleDeleteJob}
          job={job?.company_name}
        />
      </div>
    </div>
  );
};

export default Account;
