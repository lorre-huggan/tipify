import { JobModel } from '../model/job.js';

export const Job = async () => {
  try {
    const job = await JobModel.find();
    return job;
  } catch (error) {
    throw new Error(error);
  }
};
