import { JobModel } from '../model/job.js';
import { UserInputError } from 'apollo-server';
import { checkAuth } from '../utils.js/check_auth.js';

export const Jobs = async (parent, args, context) => {
  //TODO admin auth
  const userAuth = checkAuth(context);
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

export const UserJobs = async (parent, { user }, context) => {
  const userAuth = checkAuth(context);
  try {
    const jobs = await JobModel.find({ user }).sort({ createdAt: -1 });
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
  const userAuth = checkAuth(context);

  const { company_name, job_title, wages } = args.input;

  const user = await JobModel.findOne({ user: userAuth.username });

  if (user) {
    throw new UserInputError('users cannot create more than one job');
  }

  try {
    const newJob = new JobModel({
      company_name,
      job_title,
      wages,
      user: userAuth.username,
      createdAt: Date.now().toString(),
    });
    const job = await newJob.save();
    return job;
  } catch (error) {
    throw new UserInputError(error.message);
  }
};

export const CreateShift = async (_, args, context) => {
  const userAuth = checkAuth(context);

  const { tips, hours_worked, date, user } = args.input;

  try {
    const job = await JobModel.findOne({ user });

    job.wages.push({ tips, hours_worked, date });

    const newWage = await job.save();
    return newWage;
  } catch (error) {
    throw new UserInputError('error');
  }
};

export const UpdateJob = async (parent, args, context) => {
  const userAuth = checkAuth(context);

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
  const userAuth = checkAuth(context);
  const { id } = args;

  try {
    const remove = JobModel.findByIdAndDelete(id);
    return remove;
  } catch (error) {
    throw new UserInputError(error.message);
  }
};

export const DeleteShift = async (_, args, context) => {
  const user = checkAuth(context);
  const { jobId, wageId } = args;
  const job = await JobModel.findOne({ _id: jobId });

  if (user.username !== job.user) {
    throw new UserInputError('User Not Authorized');
  }
  if (!job.wages) {
    return new UserInputError('Items not found ');
  }

  const shift = job.wages;

  const updatedJob = shift.filter((job) => {
    return job._id.toString() !== wageId;
  });

  job.wages = updatedJob;
  job.updatedAt = Date.now();

  try {
    const updated = await job.save();
    return updated;
  } catch (error) {
    console.log(error.message);
  }
};
