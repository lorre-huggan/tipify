import { Jobs, Job, CreateJob, UpdateJob } from '../../controllers/job.js';

export const jobResolvers = {
  Query: {
    Jobs,
    Job,
  },
  Mutation: {
    CreateJob,
    UpdateJob,
  },
};
