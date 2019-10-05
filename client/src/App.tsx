import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Header } from './components/Header';
import { Routes } from './Routes';
import { apolloClient } from './utils/apolloClient';
import { Auth0Provider } from './utils/auth0';

import background from './background.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;

    background-image: url(${background});
    background-size: cover;
  }
`;

// @ts-ignore
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const {
  REACT_APP_AUTH0_DOMAIN = '',
  REACT_APP_AUTH0_CLIENT_ID = '',
} = process.env;

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      client_id={REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloProvider client={apolloClient}>
        <GlobalStyle />{' '}
        <BrowserRouter>
          {' '}
          <div className="App">
            <Header />
            <Routes />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  );
};

export default App;
