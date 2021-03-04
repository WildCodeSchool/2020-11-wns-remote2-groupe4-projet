import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import ProtectedRoute from './ProtectedRoute';
import ViewSignIn from '../views/sign-in/ViewSignIn';
import ViewDashboard from '../views/dashboard/ViewDashboard';
import ViewSignUp from '../views/sign-up/ViewSignUp';
import MainCtnr from '../containers/MainCtnr';

const AM_I_AUTHENTICATED = gql`
  query AmIAuthenticated {
    amIAuthenticated {
      firstname
      lastname
    }
  }
`;

const ProjectRouter = (): JSX.Element => {
  const { loading, data } = useQuery(AM_I_AUTHENTICATED);
  const [isAuthenticatedAfterSignIn, setIsAuthenticatedAfterSignIn] = useState(
    false
  );

  const handleIsAuthenticated = () => {
    setIsAuthenticatedAfterSignIn(true);
  };

  return (
    <Router>
      {loading ? (
        <p>LOADING...</p>
      ) : (
        <Switch>
          <Route exact path="/">
            <ViewSignIn handleIsAuthenticated={handleIsAuthenticated} />
          </Route>
          <Route path="/sign-in">
            <ViewSignIn handleIsAuthenticated={handleIsAuthenticated} />
          </Route>
          <Route path="/sign-up" component={ViewSignUp} />
          <MainCtnr>
            <ProtectedRoute
              exact
              path="/dashboard"
              component={ViewDashboard}
              isAuthenticated={!!data || isAuthenticatedAfterSignIn}
            />
          </MainCtnr>
        </Switch>
      )}
    </Router>
  );
};

export default ProjectRouter;
