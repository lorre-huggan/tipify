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
    hours_worked: Float!
    date: String!
    _id:ID!
  }

  input JobInput {
    company_name: String!
    job_title: String!
    wages: [WageInput]
    user:String!
  }

  input WageInput {
    tips: Float!
    hours_worked: Float!
    date: Int!
  }

  input ShiftInput {
    tips:Float!
    hours_worked: Float!
    date: Int!
    user:String!

  }

  extend type Query {
    Jobs: [Job]!
    Job(id: ID!): Job!
    UserJobs(user: String!): [Job]!
  }

  extend type Mutation {
    CreateJob(input: JobInput!): Job!
    CreateShift(input: ShiftInput!): Job!
    UpdateJob(input: JobInput!, id: ID!): Job!
    DeleteJob(id: ID!): Job!
    DeleteShift(jobId:String!, wageId:String!): Job!
  }
`;
