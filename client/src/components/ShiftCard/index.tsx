import { fromUnixTime } from 'date-fns';
import React, { useState } from 'react';
import { UserJob, Wage } from '../../types/job-types';
import { AuthUser } from '../../types/user-types';
import './styles.scss';
import {
  AiFillEdit,
  AiOutlineClockCircle,
  AiOutlineDelete,
} from 'react-icons/ai';
import {
  RiMoneyDollarCircleLine,
  RiMoneyEuroCircleLine,
  RiMoneyPoundCircleLine,
} from 'react-icons/ri';
import { useMutation } from '@apollo/client';
import { DELETE_WAGE, GET_USER_JOBS } from '../../gql/request/job/request';
import { UseAuth } from '../../hooks/useAuth';
interface Props {
  user: AuthUser;
  data: Wage | undefined;
  job: UserJob;
}

const ShiftCard: React.FC<Props> = ({ user, data, job }) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  const getDate = fromUnixTime(Number(data?.date)).toString();
  const [deleted, setDeleted] = useState<boolean>(false);

  const day = getDate.split(' ')[0];
  const month = getDate.split(' ')[1];
  const dayNum = getDate.split(' ')[2];
  const year = getDate.split(' ')[3];

  const [DeleteShift, { loading }] = useMutation(DELETE_WAGE, {
    update: (proxy, { data: { DeleteShift } }) => {
      const _data: any = proxy.readQuery({
        query: GET_USER_JOBS,
        variables: { user: authUser.username },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = () => {
    setDeleted(true);
    setTimeout(() => {
      DeleteShift({
        variables: { jobId: job._id.toString(), wageId: data?._id.toString() },
      });
      setDeleted(false);
    }, 500);
  };

  return (
    <div className={deleted ? 'shift-card-deleted' : 'shift-card-container'}>
      {loading && <p>Loading</p>}
      <div className="shift-card-time">
        <AiOutlineClockCircle />
        <span>{`${day} ${dayNum} ${month} ${year}`}</span>
      </div>

      <h3 className="shift-card-company-name">{`${job.company_name}`}</h3>
      <span className="shift-card-job-title">{`${job.job_title}`}</span>
      <span className="shift-card-hours">{`${data?.hours_worked} Hours`}</span>
      <span className="shift-card-earned">
        {user.currency === 'GBP' ? <RiMoneyPoundCircleLine /> : ''}
        {user.currency === 'USD' ? <RiMoneyDollarCircleLine /> : ''}
        {user.currency === 'EUR' ? <RiMoneyEuroCircleLine /> : ''}
        <span>{data?.tips}</span>
      </span>
      <div className="shift-card-mods">
        <button onClick={handleDelete}>
          <AiOutlineDelete className="shift-card-delete" />
        </button>
        {/* TODO add ability to edit shift */}
        {/* <AiFillEdit className="shift-card-edit" /> */}
      </div>
    </div>
  );
};

export default ShiftCard;
