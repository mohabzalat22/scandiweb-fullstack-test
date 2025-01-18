import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import client from "./graphql/client";
import { ApolloProvider } from '@apollo/client';
import store from './rtk/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>,
  </StrictMode>
);
