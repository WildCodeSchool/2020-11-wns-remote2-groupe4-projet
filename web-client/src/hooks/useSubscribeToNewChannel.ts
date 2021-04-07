import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import {
  NewChannelForUser,
  NewChannelForUserParams,
  UserData,
  UserParams,
  UseSubscribeToNewChannelReturn,
} from '../interfaces/useSubscribeToNewChannelTypes';
import { GET_USER_CHANNELS } from '../graphql/user';
import { SUBSCRIBE_TO_NEW_CHANNEL } from '../graphql/channel';

const useSubscribeToNewChannel = (): UseSubscribeToNewChannelReturn => {
  const { loading, error, data, subscribeToMore } = useQuery<
    UserData,
    UserParams
  >(GET_USER_CHANNELS, {
    variables: { id: '8' },
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
        variables: { userId: '8' },
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
