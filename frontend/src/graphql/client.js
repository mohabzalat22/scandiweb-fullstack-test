import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://scanditest.a0001.net/graphql",
  fetchOptions: {
    mode: "no-cors", // Disable CORS enforcement
  },
  cache: new InMemoryCache(),
});

export default client;
