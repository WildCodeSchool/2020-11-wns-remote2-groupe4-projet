import React, { useReducer } from 'react';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import userReducer from './reducers/userReducer';
import UserContext, { userInitialState } from './contexts/UserContext';
import ProjectRouter from './router/ProjectRouter';
import ChannelContext, { channelInitialState } from './contexts/ChannelContext';
import channelReducer from './reducers/channelReducer';

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  const [channelState, channelDispatch] = useReducer(
    channelReducer,
    channelInitialState
  );

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <ChannelContext.Provider value={{ channelState, channelDispatch }}>
          <ProjectRouter />
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
