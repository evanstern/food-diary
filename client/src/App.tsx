import React, { useEffect, useState } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Header } from './components/Header';
import { Routes } from './Routes';
import { apolloClient } from './utils/apolloClient';

import background from './background.jpg';
import auth from 'utils/auth0';
import { Loader } from 'components/Loader';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;

    background-image: url(${background});
    background-position: bottom;
    background-size: cover;
  }
`;

const AuthWrapperComponent: React.FC<RouteComponentProps> = ({
  children,
  location,
}) => {
  const [isWaiting, setIsWaiting] = useState<boolean>(true);
  const forceUpdate = useState<null>()[1];

  useEffect(() => {
    if (location.pathname === '/callback') {
      setIsWaiting(false);
      return;
    }

    const doSilentAuth = async () => {
      try {
        await auth.silentAuth();
        setIsWaiting(false);
        forceUpdate(null);
      } catch (err) {
        setIsWaiting(false);
        if (err.code === 'login_required') {
          return;
        }
        console.log(err);
      }
    };

    doSilentAuth();
  }, [location, forceUpdate]);

  if (isWaiting) {
    return <Loader />;
  }

  return <>{children}</>;
};
const AuthWrapper = withRouter(AuthWrapperComponent);

const SEO: React.FC = () => {
  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      title="Food Diary"
      meta={[
        {
          name: 'description',
          content: 'Track your food.',
        },
        {
          name: 'twitter:card',
          content: 'Track your food.',
        },
        {
          name: 'twitter:title',
          content: 'Food Diary',
        },
        {
          name: 'twitter:description',
          content: 'Track your food.',
        },
      ]}
    />
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <SEO />
      <GlobalStyle />{' '}
      <BrowserRouter>
        {' '}
        <div className="App">
          <AuthWrapper>
            <Header />
            <Routes />
          </AuthWrapper>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
