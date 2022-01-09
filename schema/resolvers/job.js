import { Jobs, Job, CreateJob } from '../../controllers/job.js';

export const jobResolvers = {
  Query: {
    Jobs,
    Job,
  },
  Mutation: {
    CreateJob,
  },
};
