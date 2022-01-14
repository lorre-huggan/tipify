export const jobTypeDefs = `
  type Job {
    _id: ID!
    company_name: String!
    job_title: String!
    wages: [Wage]
    user: ID!
    username: String!
    createdAt: String!
    updatedAt: String
  }

  type Wage {
    tips: Float!
    hours_worked: Int!
    date: String!
    _id:ID!
  }

  input JobInput {
    company_name: String!
    job_title: String!
    wages: [WageInput]
  }

  input WageInput {
    tips: Float!
    hours_worked: Int!
    date: String!
  }

  extend type Query {
    Jobs: [Job]!
    Job(id: ID!): Job!
    UserJobs(id: String!): [Job]!
  }

  extend type Mutation {
    CreateJob(input: JobInput!): Job!
    UpdateJob(input: JobInput!, id: ID!): Job!
    DeleteJob(input: ID!): Job!
    DeleteShift(jobId:String!, wageId:String!): Job!
  }
`;
