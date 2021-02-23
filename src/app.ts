import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import schema from './libs/schema';

const app = new Koa();

const apollo = new ApolloServer({
  schema,
});

apollo.applyMiddleware({ app });

export default app;
