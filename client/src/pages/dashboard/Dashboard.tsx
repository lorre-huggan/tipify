import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import { useQuery } from '@apollo/client';
import { GET_USER_JOBS } from '../../gql/request/job/request';
import { AuthUser } from '../../types/user-types';
import { UserJobs, Wage } from '../../types/job-types';
import UserCard from '../../components/UserCard';
import './styles.scss';
import AddShift from '../../components/AddShift';
import MonthAnalytics from '../../components/Analytics/Month';
import DailyAnalytics from '../../components/Analytics/Daily';
import ShiftCard from '../../components/ShiftCard';
import { compareDesc } from 'date-fns';

interface Props {}

const Dashboard = (props: Props) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  //TODO handle loading and errors
  const { loading, data, error } = useQuery<UserJobs>(GET_USER_JOBS, {
    variables: { user: authUser?.username },
  });

  const shifts: Wage[] = [];

  data?.UserJobs.map((wage) => {
    return wage.wages.map((w) => {
      shifts.push(w);
      return w;
    });
  });

  const sortedShifts = shifts.sort((a, b) =>
    compareDesc(Number(a.date), Number(b.date))
  );

  return (
    <main className="dashboard">
      <Nav />
      {!loading && (
        <>
          <div className="dashboard-grid">
            <UserCard user={authUser} data={data?.UserJobs} />
            <AddShift user={authUser?.username} />
            <MonthAnalytics data={data?.UserJobs} />
            <DailyAnalytics data={data?.UserJobs} />
          </div>
          <div className="dashboard-shift-grid">
            {sortedShifts &&
              sortedShifts.map((shift, i) => {
                return (
                  <ShiftCard
                    key={i}
                    user={authUser}
                    job={data?.UserJobs[0]!}
                    data={shift}
                  />
                );
              })}
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
