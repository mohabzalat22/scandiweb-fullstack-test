import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://scanditest.a0001.net/graphql?i=1",
  cache: new InMemoryCache(),
});

export default client;
