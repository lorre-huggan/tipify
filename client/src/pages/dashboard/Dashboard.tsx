import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import Nav from '../../components/Dashboard/Nav';
import { useQuery } from '@apollo/client';
import { GET_USER_JOBS } from '../../gql/request/job/request';
import { AuthUser } from '../../types/user-types';
import { UserJobs } from '../../types/job-types';
import './styles.scss';
import DateRangePicker from '../../components/DateInput/DateRangePicker';
import { useState } from 'react';
import { DateRange } from '@mui/lab/DateRangePicker';
import DashboardGrid from '../../components/Dashboard/DashboardGrid';
import ShiftGrid from '../../components/Dashboard/ShiftGrid';
import AddJob from '../../components/Dashboard/AddJob';

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

  if (data?.UserJobs.length === 0) {
    return (
      <main className="dashboard">
        <Nav />
        <AddJob data={data} user={authUser} />
      </main>
    );
  }

  return (
    <main className="dashboard">
      <Nav />
      <DashboardGrid data={data} />
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      <ShiftGrid data={data} dateRange={dateRange} />
    </main>
  );
};

export default Dashboard;

export const Loading: React.FC = () => {
  return (
    <main className="dashboard">
      <h1>Error</h1>
    </main>
  );
};

export const Error: React.FC = () => {
  return (
    <main className="dashboard">
      <h1>Loading</h1>
    </main>
  );
};
