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
      {!loading && <UserCard user={authUser} data={data?.UserJobs} />}

      {/* footer */}
    </main>
  );
};

export default Dashboard;
