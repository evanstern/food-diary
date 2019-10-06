import React, { useEffect } from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Layout } from 'components/Layout';
import auth from '../utils/auth0';

interface IProps extends RouteComponentProps {}

const CallbackComponent: React.FC<IProps> = ({ history }) => {
  useEffect(() => {
    const doAuth = async () => {
      await auth.handleAuthentication();
      history.replace('/food-diary/');
    };
    doAuth();
  }, [history]);

  return <Layout>Loading ...</Layout>;
};

export const Callback = withRouter(CallbackComponent);
