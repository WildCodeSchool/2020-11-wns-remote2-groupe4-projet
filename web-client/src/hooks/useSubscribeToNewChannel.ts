import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import {
  NewChannelForUser,
  NewChannelForUserParams,
  UserData,
  UserParams,
  UseSubscribeToNewChannelReturn,
} from '../interfaces/useSubscribeToNewChannelTypes';
import { GET_USER_CHANNELS } from '../queries/userQueries';
import { SUBSCRIBE_TO_NEW_CHANNEL } from '../subscriptions/channelSubscription';

const useSubscribeToNewChannel = (
  userId: string
): UseSubscribeToNewChannelReturn => {
  const { loading, error, data, subscribeToMore } = useQuery<
    UserData,
    UserParams
  >(GET_USER_CHANNELS, {
    variables: { id: userId },
  });

  const [isSubscribedToNewChannel, setIsSubscribedToNewChannel] = useState(
    false
  );

  useEffect(() => {
    if (!isSubscribedToNewChannel) {
      subscribeToMore<NewChannelForUser, NewChannelForUserParams>({
        // Subscription to execute
        document: SUBSCRIBE_TO_NEW_CHANNEL,
        // Variables to pass when executing subscription
        variables: { userId: userId },
        // Tells how to combine query's currently cached result with subscriptionData pushed by Graphql server
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            user: {
              channels: [
                ...prev.user.channels,
                {
                  id: subscriptionData.data.newChannelForUser.id,
                  title: subscriptionData.data.newChannelForUser.title,
                  messages: subscriptionData.data.newChannelForUser.messages,
                  users: subscriptionData.data.newChannelForUser.users,
                },
              ],
            },
          };
        },
      });
      setIsSubscribedToNewChannel(true);
    }
  }, [data]);

  return { loading, error, data };
};

export default useSubscribeToNewChannel;
