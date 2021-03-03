import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data } = useQuery(AM_I_AUTHENTICATED);

  const handleIsAuthenticated = (): void => {
    data.amIAuthenticated
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
  };

  useEffect(() => {
    if (data) {
      handleIsAuthenticated();
      console.log(data);
      console.log(isAuthenticated);
    }
    console.log('Hello');
  }, [data]);

  if (!isAuthenticated) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <ViewSignIn />
          </Route>
          <Route exact path="/sign-in">
            <ViewSignIn />
          </Route>
          <Route path="/sign-up" component={ViewSignUp} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ViewSignIn} />
        <Route path="/sign-in" component={ViewSignIn} />
        <Route path="/sign-up" component={ViewSignUp} />
        <MainCtnr>
          <Route exact path="/dashboard" component={ViewDashboard} />
        </MainCtnr>
      </Switch>
    </Router>
  );
};

export default ProjectRouter;
