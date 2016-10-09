import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const Configuration = new GraphQLObjectType({
  name: 'Configuration',
  description: 'App configuration',
  fields: {
    port: {
      type: GraphQLInt,
      resolve(config) {
        return config.port;
      }
    },

    description: {
      type: GraphQLString,
      resolve(config) {
        return config.description;
      }
    },

    version: {
      type: GraphQLInt,
      resolve(config) {
        return config.version;
      }
    }
  }
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      description: 'Hello world string',
      resolve() {
        return 'world';
      }
    },

    configuration: {
      type: Configuration,
      args: {
        version: {
          type: GraphQLInt,
          description: 'Application version matcher, this method allows the application to check its depedencies.'
        },
        actual: {
          type: GraphQLInt
        }
      },
      resolve(root, args) {
        return {
          name: 'Joel Roxell',
          description: 'The actual description',
          port: 3001,
          version: args.version
        };
      }
    }
  }
});

var schema = new GraphQLSchema({
  query
});

export default schema;
