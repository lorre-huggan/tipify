export interface UserJob {
  __typename: string;
  _id: string;
  company_name: string;
  job_title: string;
  wages: Wage[];
  createdAt: string;
  updatedAt: string;
}

export interface Wage {
  __typename: string;
  tips: number;
  hours_worked: number;
  date: string;
}

export interface UserJobs {
  UserJobs: UserJob[];
}
