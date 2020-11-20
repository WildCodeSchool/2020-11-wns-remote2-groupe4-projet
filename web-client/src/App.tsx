import React from 'react';

import './App.css';

import ProjectRouter from './router/ProjectRouter';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <ProjectRouter />
    </div>
  );
};

export default App;
