import { gql } from '@apollo/client';

const GET_JOBS = gql`
  query userJobs($userJobsId: String!) {
    userJobs(id: $userJobsId) {
      company_name
    }
  }
`;
