import { ApolloClient , InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://localhost/graphql',
    cache: new InMemoryCache(),
});

export default client;