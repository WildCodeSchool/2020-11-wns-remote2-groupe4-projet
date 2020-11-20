import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ViewLogin from '../views/ViewLogin';
import ViewDashboard from '../views/ViewDashboard';
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
