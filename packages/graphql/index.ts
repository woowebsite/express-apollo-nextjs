import { ApolloServer, gql } from 'apollo-server-express';
import modules from './modules'


const server = new ApolloServer({
  modules
});

export default server;
