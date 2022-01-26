import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import { useQuery } from '@apollo/client';
import { GET_USER_JOBS } from '../../gql/request/job/request';
import { AuthUser } from '../../types/user-types';
import { UserJobs } from '../../types/job-types';
import './styles.scss';
import DateRangePicker from '../../components/DateInput/DateRangePicker';
import { useState } from 'react';
import { DateRange } from '@mui/lab/DateRangePicker';
import DashboardGrid from '../../components/DashboardGrid';
import ShiftGrid from '../../components/ShiftGrid';

interface Props {}

const Dashboard = (props: Props) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  const { loading, data, error } = useQuery<UserJobs>(GET_USER_JOBS, {
    variables: { user: authUser?.username },
  });

  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);

  //TODO Handle error
  if (error) {
    return <Error />;
  }
  //TODO handle loading
  if (loading) {
    return <Loading />;
  }

  return (
    <main className="dashboard">
      <Nav />
      {!loading && (
        <>
          <DashboardGrid data={data} />
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <ShiftGrid data={data} dateRange={dateRange} />
        </>
      )}
    </main>
  );
};

export default Dashboard;

export const Loading: React.FC = () => {
  return (
    <main>
      <h1>Error</h1>
    </main>
  );
};

export const Error: React.FC = () => {
  return (
    <main>
      <h1>Loading</h1>
    </main>
  );
};
