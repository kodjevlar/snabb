import { Router as expressRouter } from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const router = expressRouter();
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => 'Hello world!' };

router.get('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

export default router;
