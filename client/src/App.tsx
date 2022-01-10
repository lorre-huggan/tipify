import { useQuery, gql } from '@apollo/client';
import { addDays, fromUnixTime } from 'date-fns';

const FETCH = gql`
  query Query {
    User(id: "61dc481e19908d25f8f41630") {
      username
      email
    }
  }
`;

const day = new Date();
const tomorrow = addDays(day, 2);
const split = tomorrow.toString().split(' ')[0];
console.log(split);

const x = fromUnixTime(1641852334);
console.log({ days: x });

function App() {
  const { data } = useQuery(FETCH);
  console.log(data);

  return (
    <div>
      <span className="text-xl text-red-500"></span>
      hello
    </div>
  );
}

export default App;
