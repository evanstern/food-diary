import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Header } from './components/Header';
import { Routes } from './Routes';
import { apolloClient } from './utils/apolloClient';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const App: React.FC = () => {
  return (
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
  );
};

export default App;
