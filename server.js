import { ApolloServer } from 'apollo-server';
import { connectDB, DB_AUTH } from './db/db.js';
import { typeDefs } from './schema/type-defs/index_type_defs.js';
import { resolvers } from './schema/resolvers/index.js';
import { jobData, userData } from './fakedata.js';
import { JobModel } from './model/job.js';
import { UserModel } from './model/user.js';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

(async () => {
  try {
    await connectDB(DB_AUTH);
    console.log('connected to Mongodb');
    const server = await apolloServer.listen({ port: 4000 });
    console.log(`Server Running On Port ${server.url}...`);
    // await JobModel.insertMany(jobData);
    // console.log('inserted db');
    // await UserModel.insertMany(userData);
    // console.log('inserted db');
  } catch (error) {
    console.log(error.message);
  }
})();
