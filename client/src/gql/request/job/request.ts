import { gql } from '@apollo/client';

export const GET_USER_JOBS = gql`
  query userJobs($user: String!) {
    UserJobs(user: $user) {
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
      _id
      company_name
      job_title
      wages {
        tips
        hours_worked
        date
        _id
      }
    }
  }
`;

export const CREATE_SHIFT = gql`
  mutation createShift($input: ShiftInput!) {
    CreateShift(input: $input) {
      _id
      company_name
      job_title
      wages {
        tips
        hours_worked
        date
        _id
      }
    }
  }
`;
