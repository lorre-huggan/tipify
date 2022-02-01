import { ApolloServer } from 'apollo-server';
import { connectDB, DB_AUTH } from './db/db.js';
import { typeDefs } from './schema/type-defs/index_type_defs.js';
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
  } catch (error) {
    console.log(error.message);
  }
})();
