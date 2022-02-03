import { useMutation } from '@apollo/client';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { DELETE_JOB, GET_USER_JOBS } from '../../../../gql/request/job/request';
import { UseAuth } from '../../../../hooks/useAuth';
import { UserJob, UserJobs } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import DeleteAccountModal from '../Modal/DeleteAccount';
import DeleteJobModal from '../Modal/DeleteJob';
import './styles.scss';

type Props = {
  id: string;
  job: UserJob | undefined;
};

const Account: React.FC<Props> = ({ id, job }) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();

  return (
    <div className="account">
      <h1 className="account-title">My Account</h1>
      <div className="account-job-remove">
        <p>{`Delete ${job?.company_name}`}</p>
        <DeleteJobModal id={id} job={job?.company_name} />
      </div>
      <div className="account-job-remove">
        <p>{`Delete ${authUser.username} account`}</p>
        <DeleteAccountModal id={id} job={job} />
      </div>
    </div>
  );
};

export default Account;
