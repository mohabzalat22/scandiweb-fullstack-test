import { ApolloClient , InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://scandiweb-fullstack-test-cvtu.vercel.app/graphql',
    cache: new InMemoryCache(),
});

export default client;