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
        _id
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_WAGE = gql`
  mutation deleteWage($jobId: String!, $wageId: String!) {
    DeleteShift(jobId: $jobId, wageId: $wageId) {
      company_name
      updatedAt
      username
      user
    }
  }
`;
