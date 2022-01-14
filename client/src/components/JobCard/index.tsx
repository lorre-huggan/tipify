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

  return (
    <div className="job-card-container" style={{}}>
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
        <AiOutlineDelete className="job-card-delete" />
        <AiFillEdit className="job-card-edit" />
      </div>
    </div>
  );
};

export default JobCard;
