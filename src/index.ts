import 'reflect-metadata';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { createConnection } from 'typeorm';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const bookResolvers = {
  Query: {
    books: () => books,
  },
};

const main = async () => {
  await createConnection();

  const server = new ApolloServer({ typeDefs, resolvers: bookResolvers });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

main();
