import React from 'react';

import { Layout } from 'components/Layout';
import { Header, Divider } from 'semantic-ui-react';
import auth from 'utils/auth0';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <Layout>
      <Header as="h1" textAlign="center">
        Welcome to Food Diary
      </Header>
      <Divider horizontal>Track your food</Divider>
      {auth.isAuthenticated() ? (
        <Header as="h3" textAlign="center">
          <Link to="/food-diary/">Get started!</Link>
        </Header>
      ) : (
        <Header as="h3" textAlign="center">
          Sign up and get started!
        </Header>
      )}
    </Layout>
  );
};
