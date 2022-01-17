export interface UserJob {
  __typename: string;
  _id: string;
  company_name: string;
  job_title: string;
  wages: Wage[];
  createdAt: number;
  updatedAt: number;
}

export interface Wage {
  __typename: string;
  tips: number;
  hours_worked: number;
  date: number;
  _id: string;
}

export interface UserJobs {
  UserJobs: UserJob[];
}
