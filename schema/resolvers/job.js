import {
  Jobs,
  Job,
  CreateJob,
  UpdateJob,
  DeleteJob,
  UserJobs,
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
  },
};
