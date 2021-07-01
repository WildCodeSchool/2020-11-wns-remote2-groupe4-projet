import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import {
  ChannelData,
  ChannelParams,
  NewChannelMessage,
  NewChannelMessageParams,
  UseSubscribeToNewChannelMessageReturn,
} from '../interfaces/useSubscribeToNewChannelMessageTypes';
import { GET_CHANNEL_MESSAGES } from '../queries/messageQueries';
import { SUBSCRIBE_TO_NEW_CHANNEL_MESSAGE } from '../subscriptions/messageSubscription';

const useSubscribeToNewChannelMessage = (
  channelId: string
): UseSubscribeToNewChannelMessageReturn => {
  const { loading, error, data, subscribeToMore } = useQuery<
    ChannelData,
    ChannelParams
  >(GET_CHANNEL_MESSAGES, {
    fetchPolicy: 'cache-and-network',
    variables: { channelId: channelId },
  });

  const [
    isSubscribedToNewChannelMessage,
    setIsSubscribedToNewChannelMessage,
  ] = useState(false);

  useEffect(() => {
    if (!isSubscribedToNewChannelMessage) {
      subscribeToMore<NewChannelMessage, NewChannelMessageParams>({
        // Subscription to execute
        document: SUBSCRIBE_TO_NEW_CHANNEL_MESSAGE,
        // Variables to pass when executing subscription
        variables: { channelId: channelId },
        // Tells how to combine query's currently cached result with subscriptionData pushed by Graphql server
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            messagesByChannelId: [
              ...prev.messagesByChannelId,
              {
                id: subscriptionData.data.newChannelMessage.id,
                content: subscriptionData.data.newChannelMessage.content,
                sentAt: subscriptionData.data.newChannelMessage.sentAt,
                author: subscriptionData.data.newChannelMessage.author,
              },
            ],
          };
        },
      });
      setIsSubscribedToNewChannelMessage(true);
    }
  }, [data]);

  return { loading, error, data };
};

export default useSubscribeToNewChannelMessage;
