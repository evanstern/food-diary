import React from 'react';

import { Route } from 'react-router-dom';

import auth from 'utils/auth0';
import { Loader } from 'components/Loader';

interface IProps {
  component: any;
  path: string;
}

export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  path,
  ...props
}) => {
  return (
    <Route
      path={path}
      {...props}
      render={renderProps => {
        if (!auth.isAuthenticated()) {
          auth.login();
          return <Loader />;
        }
        return <Component {...renderProps} />;
      }}
    />
  );
};
