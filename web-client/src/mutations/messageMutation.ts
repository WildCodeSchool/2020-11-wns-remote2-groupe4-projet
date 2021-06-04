import { gql } from '@apollo/client';

export const CREATE_CHANNEL_MESSAGES = gql`
  mutation CreateChannelMessage($channelId: String!, $content: String!) {
    createChannelMessage(data: { channelId: $channelId, content: $content }) {
      id
      content
      sentAt
      author {
        id
        firstname
        lastname
      }
    }
  }
`;
