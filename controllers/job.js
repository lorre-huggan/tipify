import { JobModel } from '../model/job.js';
import { UserInputError } from 'apollo-server';
import { checkAuth } from '../utils.js/check_auth.js';
import { UserModel } from '../model/user.js';

export const Jobs = async (parent, args, context) => {
  const user = checkAuth(context);
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

export const Job = async (parent, args, context) => {
  const user = checkAuth(context);
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

export const UpdateJob = async (parent, args, context) => {
  const user = checkAuth(context);

  const { id } = args;
  const { company_name, job_title, tips, hours_worked, date } = args.input;

  const job = await JobModel.findById({ _id: id });

  try {
    const updateJob = JobModel.findByIdAndUpdate(id, {
      company_name: company_name ? company_name : job.company_name,
      job_title: job_title ? job_title : job.job_title,
      wages: [
        {
          tips: tips ? tips : job.tips,
          hours_worked: hours_worked ? hours_worked : job.hours_worked,
          date: date ? date : job.date,
        },
      ],
      updatedAt: String(Date.now()),
    });
    return updateJob;
  } catch (error) {
    console.log.error(error.message);
  }
};

export const DeleteJob = async (parent, args, context) => {
  const user = checkAuth(context);
  const { id } = args;

  try {
    const remove = JobModel.findByIdAndDelete(id);
    return remove;
  } catch (error) {
    throw new UserInputError(error.message);
  }
};
