import {
  Jobs,
  Job,
  CreateJob,
  UpdateJob,
  DeleteJob,
} from '../../controllers/job.js';

export const jobResolvers = {
  Query: {
    Jobs,
    Job,
  },
  Mutation: {
    CreateJob,
    UpdateJob,
    DeleteJob,
  },
};
