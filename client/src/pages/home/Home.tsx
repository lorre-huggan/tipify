import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../../gql/request/user/request';

interface Props {}

const Home = (props: Props) => {
  const { data } = useQuery(GET_USERS);
  const { Users } = data;
  console.log(Users);

  return <div>home</div>;
};

export default Home;
