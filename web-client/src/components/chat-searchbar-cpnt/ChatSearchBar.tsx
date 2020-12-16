import React from 'react';
import TextField from '@material-ui/core/TextField';

import './ChatSearchBar.scss';

const ChatSearchBar = (): JSX.Element => {
  return (
    <div className="chat-searchbar-wrapper">
      <TextField
        id="outlined-search"
        label="Recherche"
        size="small"
        type="search"
        variant="outlined"
      />
    </div>
  );
};

export default ChatSearchBar;
