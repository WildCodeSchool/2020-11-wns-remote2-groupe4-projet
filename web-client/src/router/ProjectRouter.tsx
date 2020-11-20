import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ViewLogin from '../view/ViewLogin';
import ViewDashboard from '../view/ViewDashboard';
import MainCtnr from '../container/MainCtnr';

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
