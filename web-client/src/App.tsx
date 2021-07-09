import React, { useReducer } from 'react';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import userReducer from './reducers/userReducer';
import UserContext, { userInitialState } from './contexts/UserContext';
import ProjectRouter from './router/ProjectRouter';
import ChannelContext, { channelInitialState } from './contexts/ChannelContext';
import channelReducer from './reducers/channelReducer';
import RightAsideCtnrContext, {
  rightAsideCtnrInitialState,
} from './contexts/RightAsideCtnrContext';
import rightAsideCtnrReducer from './reducers/rightAsideCtnrReducer';

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  const [channelState, channelDispatch] = useReducer(
    channelReducer,
    channelInitialState
  );
  const [rightAsideCtnrState, rightAsideCtnrDispatch] = useReducer(
    rightAsideCtnrReducer,
    rightAsideCtnrInitialState
  );

  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <ChannelContext.Provider value={{ channelState, channelDispatch }}>
          <RightAsideCtnrContext.Provider
            value={{ rightAsideCtnrState, rightAsideCtnrDispatch }}
          >
            <ProjectRouter />
          </RightAsideCtnrContext.Provider>
        </ChannelContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
