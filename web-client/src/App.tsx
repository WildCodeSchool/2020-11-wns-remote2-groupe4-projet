import React, { useReducer } from 'react';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import userReducer from './reducers/userReducer';
import UserContext from './contexts/UserContext';
import ProjectRouter from './router/ProjectRouter';

const initialState = {
  userLoggedInDetails: null,
};

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <ProjectRouter />
      </UserContext.Provider>
    </div>
  );
};

export default App;
