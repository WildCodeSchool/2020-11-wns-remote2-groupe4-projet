import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ViewSignIn from '../views/sign-in/ViewSignIn';
import ViewDashboard from '../views/dashboard/ViewDashboard';
import ViewSignUp from '../views/sign-up/ViewSignUp';
import MainCtnr from '../containers/MainCtnr';

const ProjectRouter = (): JSX.Element => {
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
