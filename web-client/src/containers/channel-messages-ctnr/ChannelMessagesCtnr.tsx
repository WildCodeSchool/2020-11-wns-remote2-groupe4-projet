import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faTimes,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

import MessageCpnt from '../../components/message-cpnt/MessageCpnt';
import { Message } from '../../interfaces/messageInterface';
import ChannelContext from '../../contexts/ChannelContext';
import AutosizeTextareaCpnt from '../../components/autosize-textarea-cpnt/AutosizeTextareaCpnt';

const ChannelMessagesCtnr = (): JSX.Element => {
  const channelContext = useContext(ChannelContext);

  const handleAddUserToChannel = () => {
    // TODO
    console.log('hi');
  };

  const handleCloseChannel = () => {
    channelContext.channelDispatch({
      type: 'CLOSE_CURRENT_CHANNEL',
      isChannelOpen: false,
    });
  };

  const onSubmitMessage = () => {
    // TODO
    console.log('hi');
  };

  return (
    <div className="channel-messages">
      <div className="cm-header">
        <h4>{channelContext.channelState.currentChannel?.title}</h4>
        <div className="cmh-button-wrapper">
          <button
            className="cmh-button add-border "
            onClick={handleAddUserToChannel}
          >
            <FontAwesomeIcon icon={faUserPlus} className="cmhb-add-user-icon" />
          </button>
          <button
            className="cmh-button close-border"
            onClick={handleCloseChannel}
          >
            <FontAwesomeIcon icon={faTimes} className="cmhb-cross-icon" />
          </button>
        </div>
      </div>

      <div className="cm-content-wrapper">
        <ul className="cmcw-ul">
          {channelContext.channelState.currentChannel?.messages?.map(
            (m: Message, index, arr) => {
              if (
                index >= 1 &&
                JSON.stringify(m.author) ===
                  JSON.stringify(arr[index - 1].author)
              ) {
                return <MessageCpnt key={m.id} message={m} />;
              }
              return <MessageCpnt key={m.id} message={m} hasHeader={true} />;
            }
          )}
        </ul>

        <form className="cmcw-form" onSubmit={onSubmitMessage}>
          <AutosizeTextareaCpnt />
          <div className="cmcwf-footer">
            <button className="cmcwff-send-button">
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="cmcwff-send-icon"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChannelMessagesCtnr;
