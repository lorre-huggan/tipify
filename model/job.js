import mongoose from 'mongoose';

const wageSchema = new mongoose.Schema({
  tips: Number,
  hours_worked: Number,
  date: Number,
});

const jobSchema = new mongoose.Schema({
  company_name: String,
  job_title: String,
  wages: [wageSchema],
});

export const JobModel = mongoose.model('Job', jobSchema);
