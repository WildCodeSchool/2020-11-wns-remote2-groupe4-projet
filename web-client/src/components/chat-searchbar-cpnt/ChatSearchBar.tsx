import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './ChatSearchBar.scss';

const ChatSearchBar = (): JSX.Element => {
  return (
    <div className="chat-searchbar-wrapper">
      <Autocomplete
        id="autocomplete-searchbar"
        options={[
          { channelTitle: 'Option1' },
          { channelTitle: 'Option2' },
          { channelTitle: 'Option3' },
          { channelTitle: 'Option4' },
          { channelTitle: 'Test' },
        ]}
        getOptionLabel={(option) => option.channelTitle}
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-textfield-searchbar"
            label="Recherche"
            size="small"
            type="search"
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default ChatSearchBar;
