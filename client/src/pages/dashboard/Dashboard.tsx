import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import Nav from '../../components/Nav';
import { useQuery } from '@apollo/client';
import { GET_USER_JOBS } from '../../gql/request/job/request';
import { AuthUser } from '../../types/user-types';
import { UserJobs } from '../../types/job-types';
import UserCard from '../../components/UserCard';
import './styles.scss';
import AddShift from '../../components/AddShift';
import Analytics from '../../components/Analytics';
import ShiftCard from '../../components/ShiftCard';

interface Props {}

const Dashboard = (props: Props) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  //TODO handle loading and errors
  const { loading, data, error } = useQuery<UserJobs>(GET_USER_JOBS, {
    variables: { user: authUser?.username },
  });

  return (
    <main className="dashboard">
      <Nav username={authUser?.username} />

      {data?.UserJobs.length === 0 ? (
        <AddShift id={authUser.id} />
      ) : (
        <div className="dashboard-grid">
          {/* components */}
          {/* self improvement message */}
          {!loading && (
            <>
              <UserCard user={authUser} data={data?.UserJobs} />
              <AddShift id={authUser.id} />
              <Analytics />
            </>
          )}

          {!loading &&
            data &&
            data?.UserJobs.map((job, idx) => {
              return job.wages.slice(0, 2).map((j, i) => {
                return (
                  <ShiftCard
                    key={i}
                    user={authUser}
                    job={job}
                    data={j}
                    idx={idx}
                    gridArea={i + 1}
                  />
                );
              });
            })}
        </div>
      )}
    </main>
  );
};

export default Dashboard;
