import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
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
import { CREATE_CHANNEL_MESSAGES } from '../../mutations/messageMutation';
import useSubscribeToNewChannelMessage from '../../hooks/useSubscribeToNewChannelMessage';
import { GET_ALL_USERS } from '../../queries/userQueries';
import AddUserToChannelModalCpnt from '../../components/add-user-to-channel-modal/AddUserToChannelModalCpnt';

const ChannelMessagesCtnr = (): JSX.Element => {
  const channelContext = useContext(ChannelContext);
  const currentChannel = channelContext.channelState.currentChannel;
  if (!currentChannel) throw new Error('No current channel...');

  const { loading, error, data } = useSubscribeToNewChannelMessage(
    currentChannel.id
  );
  const [createChannelMessage] = useMutation(CREATE_CHANNEL_MESSAGES);

  const [
    isModalToAddUSerToChannelOpen,
    setIsModalToAddUSerToChannelOpen,
  ] = useState(false);
  const { data: usersData } = useQuery(GET_ALL_USERS, {
    fetchPolicy: 'no-cache',
  });

  const [textareaValue, setTextareaValue] = useState('');

    const handleAddUserToChannelModal = (): void => {
    setIsModalToAddUSerToChannelOpen(true);
  };

  const handleCloseChannel = () => {
    channelContext.channelDispatch({
      type: 'CLOSE_CURRENT_CHANNEL',
      isChannelOpen: false,
      currentChannel: null,
    });
  };

  const handleTextareaInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const onSubmitMessage = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createChannelMessage({
        variables: {
          channelId: channelContext.channelState.currentChannel?.id,
          content: textareaValue,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTextareaValue('');
    }
  };

  return (
    <div className="channel-messages">
      <div className="cm-header">
        <h4>{channelContext.channelState.currentChannel?.title}</h4>
        <div className="cmh-button-wrapper">
          <button
            className="cmh-button add-border "
            onClick={handleAddUserToChannelModal}
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
          {data &&
            data.messagesByChannelId.map((m: Message, index, arr) => {
              if (
                index >= 1 &&
                JSON.stringify(m.author) ===
                  JSON.stringify(arr[index - 1].author)
              ) {
                return <MessageCpnt key={m.id} message={m} />;
              }
              return <MessageCpnt key={m.id} message={m} hasHeader={true} />;
            })}
        </ul>

        <form className="cmcw-form" onSubmit={onSubmitMessage}>
          <AutosizeTextareaCpnt
            onChange={handleTextareaInputChange}
            value={textareaValue}
          />
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

      <AddUserToChannelModalCpnt
        isOpen={isModalToAddUSerToChannelOpen}
        title="Ajouter un(des) utilisateur(s) au channel"
        onClose={() => setIsModalToAddUSerToChannelOpen(false)}
        users={usersData && usersData.users}
        channel={currentChannel}
      />
    </div>
  );
};

export default ChannelMessagesCtnr;
