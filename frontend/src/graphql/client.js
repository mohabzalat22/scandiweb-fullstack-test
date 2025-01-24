import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://scanditest.a0001.net/graphql",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});

export default client;
