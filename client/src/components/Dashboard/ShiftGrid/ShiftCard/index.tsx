import { fromUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { UserJob, Wage } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import './styles.scss';
import { AiOutlineClockCircle, AiOutlineDelete } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import {
  DELETE_WAGE,
  GET_USER_JOBS,
} from '../../../../gql/request/job/request';
import { UseAuth } from '../../../../hooks/useAuth';
import { handleCurrency } from '../../../../utils/helpers';
interface Props {
  user: AuthUser;
  data: Wage | undefined;
  job: UserJob;
}

const ShiftCard: React.FC<Props> = ({ user, data, job }) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  const getDate = fromUnixTime(Number(data?.date)).toString();
  const [deleted, setDeleted] = useState<boolean>(false);
  const [monthTheme, setMonthTheme] = useState('');
  const [dayTheme, setDayTheme] = useState('');

  const day = getDate.split(' ')[0];
  const month = getDate.split(' ')[1];
  const dayNum = getDate.split(' ')[2];
  const year = getDate.split(' ')[3];

  useEffect(() => {
    const monthColors = [
      '#e8643550',
      '#37e0d050',
      '#ff78b950',
      '#18acff50',
      '#7547a350',
      '#ffe75c50',
      '#e1886850',
      '#aee2dd50',
      '#ffbddd50',
      '#a5ddfd50',
      '#8d7c9e50',
      '#fcf2b750',
    ];
    const dayColors = [
      '#ff78b9',
      '#18acff',
      '#ffe75c',
      '#37e0d0',
      '#7547a3',
      '#e03f4f',
      '#e86435',
    ];
    switch (month) {
      case 'Jan':
        setMonthTheme(monthColors[0]);
        break;
      case 'Feb':
        setMonthTheme(monthColors[1]);
        break;
      case 'Mar':
        setMonthTheme(monthColors[2]);
        break;
      case 'Apr':
        setMonthTheme(monthColors[3]);
        break;
      case 'May':
        setMonthTheme(monthColors[4]);
        break;
      case 'Jun':
        setMonthTheme(monthColors[5]);
        break;
      case 'Jul':
        setMonthTheme(monthColors[6]);
        break;
      case 'Aug':
        setMonthTheme(monthColors[7]);
        break;
      case 'Sep':
        setMonthTheme(monthColors[8]);
        break;
      case 'Oct':
        setMonthTheme(monthColors[9]);
        break;
      case 'Nov':
        setMonthTheme(monthColors[10]);
        break;
      case 'Dec':
        setMonthTheme(monthColors[11]);
        break;
      default:
        setMonthTheme(monthColors[0]);
        break;
    }
    switch (day) {
      case 'Mon':
        setDayTheme(dayColors[0]);
        break;
      case 'Tue':
        setDayTheme(dayColors[1]);
        break;
      case 'Wed':
        setDayTheme(dayColors[2]);
        break;
      case 'Thu':
        setDayTheme(dayColors[3]);
        break;
      case 'Fri':
        setDayTheme(dayColors[4]);
        break;
      case 'Sat':
        setDayTheme(dayColors[5]);
        break;
      case 'Sun':
        setDayTheme(dayColors[6]);
        break;
      default:
        break;
    }
  }, [month, day]);

  const [DeleteShift, { loading }] = useMutation(DELETE_WAGE, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = () => {
    DeleteShift({
      variables: { jobId: job._id.toString(), wageId: data?._id.toString() },
      refetchQueries: [
        { query: GET_USER_JOBS, variables: { user: user.username } },
      ],
    });
  };

  return (
    <div className="shift-card">
      {loading && <p>Loading</p>}
      <div className="shift-card-time">
        <AiOutlineClockCircle style={{ color: dayTheme }} />
        <small>{`${day} ${dayNum} ${month} ${year}`}</small>
      </div>

      <h3 className="shift-card-company-name">{`${job.company_name}`}</h3>
      <p className="shift-card-job-title">{`${job.job_title}`}</p>
      <h3 className="shift-card-hours">
        <span>{`${data?.hours_worked}`}</span>
        hrs
      </h3>
      <p className="shift-card-earned">{`${handleCurrency(authUser.currency)}${
        data?.tips
      }`}</p>
      <div className="shift-card-mods">
        <button onClick={handleDelete}>
          <AiOutlineDelete className="shift-card-delete" />
        </button>
        {/* TODO feat: add ability to edit shift */}
        {/* <AiFillEdit className="shift-card-edit" /> */}
      </div>
    </div>
  );
};

export default ShiftCard;
