const express = require('express');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs } = require('./apollo/typedefs');
const { resolvers } = require('./apollo/resolvers');
const { datasources } = require('./apollo/datasources');
const { RESTDataSource } = require('apollo-datasource-rest');

const PORT = 4000;

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const server = new ApolloServer({ 
	typeDefs, 
	resolvers, 
	dataSources: datasources
});

app.get('/hello', (req, res) => res.send('Hello!'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/character/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`✅ React App is listening at http://localhost:4000/`);
  console.log(`🚀 The Apollo Graphql GUI can be used at http://localhost:4000${server.graphqlPath}`);
})