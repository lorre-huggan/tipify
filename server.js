import { ApolloServer, gql } from 'apollo-server';
import { connectDB, DB_AUTH } from './db/db.js';
import { typeDefs } from './schema/type-defs/index_type_defs.js';
import { JobModel } from './model/job.js';
import { UserModel } from './model/user.js';
import { resolvers } from './schema/resolvers/index.js';

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
    // await UserModel.insertMany(userData);
    // console.log('inserted db');
    // await JobModel.insertMany(jobData);
    // console.log('inserted db');
    // await UserModel.deleteMany();
    // console.log('delete');
    // await JobModel.deleteMany();
    // console.log('delete');
  } catch (error) {
    console.log(error.message);
  }
})();
