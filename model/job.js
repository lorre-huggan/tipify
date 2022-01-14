import mongoose from 'mongoose';

const wageSchema = new mongoose.Schema({
  tips: Number,
  hours_worked: Number,
  date: Number,
  uid: String,
});

const jobSchema = new mongoose.Schema({
  company_name: String,
  job_title: String,
  wages: [wageSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  username: String,
  createdAt: Number,
  updatedAt: Number,
});

export const JobModel = mongoose.model('Job', jobSchema);
