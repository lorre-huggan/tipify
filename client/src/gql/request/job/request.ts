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
  mutation deleteWage($user: String!, $wageId: String!) {
    DeleteShift(user: $user, wageId: $wageId) {
      company_name
      updatedAt
      user
    }
  }
`;
