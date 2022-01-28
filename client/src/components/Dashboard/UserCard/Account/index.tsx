import { useMutation } from '@apollo/client';
import React from 'react';
import { DELETE_JOB, GET_USER_JOBS } from '../../../../gql/request/job/request';
import { UseAuth } from '../../../../hooks/useAuth';
import { UserJobs } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';

type Props = {
  id: string;
};

const Account: React.FC<Props> = ({ id }) => {
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

  const handleClick = () => {
    DeleteJob({
      variables: { deleteJobId: id },
      refetchQueries: [
        { query: GET_USER_JOBS, variables: { user: authUser.username } },
      ],
    });
  };

  return (
    <div>
      <h1 className="account-heading">My Account</h1>
      <button onClick={handleClick}>Remove Job</button>
    </div>
  );
};

export default Account;
