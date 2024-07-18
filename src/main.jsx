import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/60955/ecosynctest2/version/latest',
  cache: new InMemoryCache(),
});

document.getElementById('root') &&
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            checkInstallationImmediately: false,
            dappMetadata: {
              name: 'Demo React App',
              url: 'http://localhost:5173',
            },
          }}
        >
          <App />
        </MetaMaskProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
