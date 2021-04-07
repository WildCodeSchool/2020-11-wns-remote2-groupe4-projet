import React, { useReducer } from 'react';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import userReducer from './reducers/userReducer';
import UserContext, { userInitialState } from './contexts/UserContext';
import ProjectRouter from './router/ProjectRouter';

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <ProjectRouter />
      </UserContext.Provider>
    </div>
  );
};

export default App;
