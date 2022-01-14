import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import { ApolloError, useQuery } from '@apollo/client';
import { GET_USER_JOBS } from '../../gql/request/job/request';
import { userInfo } from 'os';
import { AuthUser } from '../../types/user-types';
import { UserJobs } from '../../types/job-types';
import ResponsiveDatePicker from '../../components/DatePicker';
import UserCard from '../../components/UserCard';
import JobCard from '../../components/JobCard';
import './styles.scss';
import { Line } from 'react-chartjs-2';

interface Props {}

const Dashboard = (props: Props) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  const navigate = useNavigate();
  const { loading, data, error } = useQuery<UserJobs>(GET_USER_JOBS, {
    variables: { userJobsId: authUser.id },
  });

  //TODO handle loading and errors

  const chart = {
    datasets: {},
  };

  return (
    <main className="dashboard">
      {/* Nav */}
      <Nav username={authUser?.username} />
      {/* components */}
      <div className="dashboard-grid">
        {!loading && <UserCard user={authUser} data={data?.UserJobs} />}

        {!loading &&
          data &&
          data?.UserJobs.map((job, idx) => {
            return job.wages.map((j, i) => {
              return (
                <JobCard key={i} user={authUser} job={job} data={j} idx={idx} />
              );
            });
          })}
      </div>

      {/* footer */}
    </main>
  );
};

export default Dashboard;
