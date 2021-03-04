import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectectedRouteProps extends RouteProps {
  // eslint-disable-next-line:no-any
  component: any;
  isAuthenticated: boolean;
}

const ProtectedRoute = (props: ProtectectedRouteProps): JSX.Element => {
  const { component: Component, isAuthenticated, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
