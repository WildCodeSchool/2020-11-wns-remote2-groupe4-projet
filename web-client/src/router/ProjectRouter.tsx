import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ViewLogin from '../views/login/ViewLogin';
import ViewDashboard from '../views/dashboard/ViewDashboard';
import MainCtnr from '../containers/MainCtnr';

const ProjectRouter = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={ViewLogin} />
        <MainCtnr>
          <Route exact path="/" component={ViewDashboard} />
        </MainCtnr>
      </Switch>
    </Router>
  );
};

export default ProjectRouter;
