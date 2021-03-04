import React, { useReducer } from 'react';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import userReducer from './reducers/userReducer';
import AppContext from './AppContext';
import ProjectRouter from './router/ProjectRouter';

const initialState = {
  user: null,
};

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <ProjectRouter />
      </AppContext.Provider>
    </div>
  );
};

export default App;
