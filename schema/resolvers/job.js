import {
  Jobs,
  Job,
  CreateJob,
  UpdateJob,
  DeleteJob,
  UserJobs,
  CreateShift,
  DeleteShift,
} from '../../controllers/job.js';

export const jobResolvers = {
  Query: {
    Jobs,
    Job,
    UserJobs,
  },
  Mutation: {
    CreateJob,
    UpdateJob,
    DeleteJob,
    CreateShift,
    DeleteShift,
  },
};
