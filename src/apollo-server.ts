import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';
import { buildSchema } from 'type-graphql';

import UserResolver from './resolvers/UserResolver';
import MessageResolver from './resolvers/MessageResolver';
import ChannelResolver from './resolvers/ChannelResolver';
import { setSessionIdCookie } from './express-server';
import { getUserFromSessionId } from './models/AppUser';

export const getApolloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [UserResolver, MessageResolver, ChannelResolver],
  });

  const context = async ({ req, res }: { req: Request; res: Response }) => {
    const { sessionId } = req.cookies;
    const user = await getUserFromSessionId(sessionId);

    return {
      setSessionIdCookie: setSessionIdCookie(res),
      user,
    };
  };
  return new ApolloServer({
    schema,
    context,
  });
};
