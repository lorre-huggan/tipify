import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import { useQuery } from '@apollo/client';
import { GET_USER_JOBS } from '../../gql/request/job/request';
import { AuthUser } from '../../types/user-types';
import { UserJobs } from '../../types/job-types';
import UserCard from '../../components/UserCard';
import JobCard from '../../components/JobCard';
import './styles.scss';
import { log } from 'console';

interface Props {}

const Dashboard = (props: Props) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  //TODO handle loading and errors
  const { loading, data, error } = useQuery<UserJobs>(GET_USER_JOBS, {
    variables: { userJobsId: authUser.id },
  });

  if (data) {
    console.log(data);
  }

  return (
    <main className="dashboard">
      {/* Nav */}
      <Nav username={authUser?.username} />
      {/* <div className="add-job"></div> */}
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
