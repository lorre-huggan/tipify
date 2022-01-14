import { gql } from '@apollo/client';

export const GET_USER_JOBS = gql`
  query userJobs($userJobsId: String!) {
    UserJobs(id: $userJobsId) {
      _id
      company_name
      job_title
      wages {
        tips
        hours_worked
        date
        uid
      }
      createdAt
      updatedAt
    }
  }
`;
