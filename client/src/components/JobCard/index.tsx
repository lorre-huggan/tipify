import { fromUnixTime } from 'date-fns';
import React from 'react';
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
import { DELETE_WAGE } from '../../gql/request/job/request';
interface Props {
  user: AuthUser;
  data: Wage | undefined;
  job: UserJob;
  idx: number;
}

const JobCard: React.FC<Props> = ({ user, data, job, idx }) => {
  const getDate = fromUnixTime(Number(data?.date)).toString();
  const day = getDate.split(' ')[0];
  const month = getDate.split(' ')[1];
  const dayNum = getDate.split(' ')[2];
  const year = getDate.split(' ')[3];

  const [DeleteShift, { loading }] = useMutation(DELETE_WAGE, {
    update(proxy, { data }) {
      //TODO handle loading event...
    },
    onError(error) {
      alert(error.message);
    },
  });

  const handleDelete = () => {
    DeleteShift({
      variables: { jobId: job._id.toString(), wageId: data?._id.toString() },
    });
  };

  return (
    <div className="job-card-container" style={{}}>
      {loading && <p>Loading</p>}
      <div className="job-card-time">
        <AiOutlineClockCircle />
        <span>{`${day} ${dayNum} ${month} ${year}`}</span>
      </div>

      <h3 className="job-card-company-name">{`${job.company_name}`}</h3>
      <span className="job-card-job-title">{`${job.job_title}`}</span>
      <span className="job-card-hours">{`${data?.hours_worked} Hours`}</span>
      <span className="job-card-earned">
        {user.currency === 'GBP' ? <RiMoneyPoundCircleLine /> : ''}
        {user.currency === 'USD' ? <RiMoneyDollarCircleLine /> : ''}
        {user.currency === 'EUR' ? <RiMoneyEuroCircleLine /> : ''}
        <span>{data?.tips}</span>
      </span>
      <div className="job-card-mods">
        <button onClick={handleDelete}>
          <AiOutlineDelete className="job-card-delete" />
        </button>
        <AiFillEdit className="job-card-edit" />
      </div>
    </div>
  );
};

export default JobCard;
