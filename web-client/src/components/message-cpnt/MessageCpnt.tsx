import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import { Message } from '../../interfaces/messageInterface';

const MessageCpntContent = ({ message, hasHeader }: MessageCpntProps) => {
  const user = useContext(UserContext);
  const [formattedSentAt, setFormattedSentAt] = useState('');

  const getFormattedSentAt = () => {
    const date = new Date(message.sentAt);
    setFormattedSentAt(
      `${date.toLocaleDateString(
        'fr-FR'
      )} - ${date.getHours()}:${date.getMinutes()}`
    );
  };

  useEffect(() => {
    getFormattedSentAt();
  }, [message]);

  if (
    JSON.stringify(message.author) !==
    JSON.stringify(user.state.userLoggedInDetails)
  ) {
    return (
      <>
        {hasHeader && (
          <h5 className="m-header mh-on-left">
            {message.author.lastname} {message.author.firstname}
          </h5>
        )}
        <div className="m-content-wrapper on-left">
          <div className="m-time">{formattedSentAt}</div>
          <div className="m-content color-left">{message.content}</div>
        </div>
      </>
    );
  }
  return (
    <>
      {hasHeader && (
        <h5 className="m-header mh-on-right">
          {message.author.lastname} {message.author.firstname}
        </h5>
      )}
      <div className="m-content-wrapper on-right">
        <div className="m-time">{`${formattedSentAt}`}</div>
        <div className="m-content color-right">{message.content}</div>
      </div>
    </>
  );
};

export type MessageCpntProps = {
  message: Message;
  hasHeader?: boolean;
};

const MessageCpnt = ({ message, hasHeader }: MessageCpntProps): JSX.Element => {
  return (
    <li className="message">
      <MessageCpntContent message={message} hasHeader={hasHeader} />
    </li>
  );
};

export default MessageCpnt;
