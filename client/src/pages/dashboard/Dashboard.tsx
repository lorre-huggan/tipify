import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import { ApolloError, useQuery } from '@apollo/client';
import { GET_USER_JOBS } from '../../gql/request/job/request';
import { userInfo } from 'os';
import { AuthUser } from '../../types/user-types';
import { UserJobs } from '../../types/job-types';

interface Props {}

const Dashboard = (props: Props) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  const navigate = useNavigate();
  const { loading, data, error } = useQuery<UserJobs>(GET_USER_JOBS, {
    variables: { userJobsId: authUser.id },
  });

  //TODO handle loading and errors

  return (
    <main className="dashboard">
      {/* Nav */}
      <Nav username={authUser?.username} />
      {/* components */}
      <div className="surface">{authUser?.username}</div>

      {loading && <p>Loading........</p>}
      {/* footer */}
    </main>
  );
};

export default Dashboard;
