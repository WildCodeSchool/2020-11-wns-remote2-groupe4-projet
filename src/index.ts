import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import UserResolvers from './resolvers/UserResolver'; 

const main = async () => {
  console.log('i am here');
  await createConnection();
  console.log('ici404');
  const schema = await buildSchema({
    resolvers: [UserResolvers],
  });
  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });
  console.log('hi');
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

main();
