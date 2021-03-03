import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ViewLogin from '../views/login/ViewLogin';
import ViewDashboard from '../views/dashboard/ViewDashboard';
import ViewSignIn from '../views/sign-in/ViewSignUp';
import MainCtnr from '../containers/MainCtnr';

const ProjectRouter = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ViewLogin} />
        <Route path="/login" component={ViewLogin} />
        <Route path="/sign-in" component={ViewSignIn} />
        <MainCtnr>
          <Route exact path="/dashboard" component={ViewDashboard} />
        </MainCtnr>
      </Switch>
    </Router>
  );
};

export default ProjectRouter;
