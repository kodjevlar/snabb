import express from 'express';
import graphqlHTTP from 'express-graphql';

import routes from './routes';
import schema from './schema';

const app = express();
const appAPi = express();

app.use(express.static('public'));
app.use(routes);

appAPi.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}));

app.listen(3000 || process.env.PORT, function() {
  console.log(`app server running`);
});

appAPi.listen(3001, function() {
  console.log(`graphql running`);
});
