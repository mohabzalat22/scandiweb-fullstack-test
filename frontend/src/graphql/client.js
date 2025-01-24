import { ApolloClient , InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://102.43.64.108/graphql',
    cache: new InMemoryCache(),
}); 

export default client;