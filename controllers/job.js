import { JobModel } from '../model/job.js';
import { UserInputError } from 'apollo-server';
import { checkAuth } from '../utils.js/checkAuth.js';

export const Jobs = async () => {
  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 });
    if (jobs) {
      return jobs;
    } else {
      throw new UserInputError('Job Not Found ');
    }
  } catch (error) {
    throw new UserInputError(error.message);
  }
};

export const Job = async (parent, args) => {
  const { id } = args;

  try {
    const job = await JobModel.findById({ _id: id });
    if (job) {
      return job;
    } else {
      throw new UserInputError('Job Not Found ');
    }
  } catch (error) {
    throw new UserInputError(error.message);
  }
};

export const CreateJob = async (parent, args, context) => {
  const user = checkAuth(context);

  const { company_name, job_title, wages } = args.input;
  console.log(wages);

  const company = await JobModel.findOne({ company_name });
  if (company) {
    throw new UserInputError('company name already exist', {
      error: {
        username: 'company already exist...',
      },
    });
  }

  if (company_name)
    try {
      const newJob = new JobModel({
        company_name,
        job_title,
        wages,
        user: user.id,
        username: user.username,
        createdAt: Date.now().toString(),
      });
      const job = await newJob.save();
      return job;
    } catch (error) {
      throw new UserInputError(error.message);
    }
};

export const updateJob = async (parent, args) => {};
