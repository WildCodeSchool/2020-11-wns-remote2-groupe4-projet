import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Ctx,
  Subscription,
  Root,
  PubSub,
  Publisher,
} from 'type-graphql';
import { CreateChannelInput } from '../inputs/ChannelInput';
import { AppUserIdInput } from '../inputs/UserInput';
import AppUser from '../models/AppUser';
import Channel from '../models/Channel';

type NewChannelPayload = {
  channel: Channel;
};

type NewChannelForUserPayload = {
  users: AppUser[];
  channel: Channel;
};

@Resolver()
export default class ChannelResolver {
  // Get all channels
  @Query(() => [Channel])
  channels(): Promise<Channel[]> {
    return Channel.find();
  }

  // Get channel by id
  @Query(() => Channel)
  async channel(@Arg('id') id: string): Promise<Channel | undefined> {
    const channel = await Channel.findOne(id);

    if (!channel) throw new Error('No channel found.');

    return channel;
  }

  // Create channel with global sub
  @Mutation(() => Channel)
  async createChannel(
    @Arg('channelInput') channelInput: CreateChannelInput,
    @Arg('users', () => [AppUserIdInput]) users: AppUser[],
    @Ctx() { user }: { user: AppUser | null },
    @PubSub('NEW_CHANNEL') publishNewChannel: Publisher<NewChannelPayload>
  ): Promise<Channel> {
    try {
      if (!user) throw new Error('You are not authenticated.');

      const channel = new Channel();
      channel.title = channelInput.title;
      channel.users = Promise.resolve(users);

      await channel.save();

      publishNewChannel({ channel });

      return channel;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Add users on a channel
  @Mutation(() => Channel)
  async addUsersToChannel(
    @Arg('channelId') channelId: string,
    @Arg('usersToAdd', () => [AppUserIdInput]) usersToAdd: AppUser[],
    @Ctx() { user }: { user: AppUser | null }
  ): Promise<Channel> {
    try {
      if (!user) throw new Error('You are not authenticated.');

      const channel = await Channel.findOne(channelId);
      if (!channel) throw new Error('No channel found.');

      if (!usersToAdd || !usersToAdd.length)
        throw new Error('No user to add provided');

      const channelUsers = await channel.users;
      const userList = channelUsers.concat(usersToAdd);
      channel.users = Promise.resolve(userList);

      await channel.save();

      return channel;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Create channel with sub filtered
  @Mutation(() => Channel)
  async createChannelWithFilteredSub(
    @Arg('channelInput') channelInput: CreateChannelInput,
    @Arg('users', () => [AppUserIdInput]) users: AppUser[],
    @Ctx() { user }: { user: AppUser | null },
    @PubSub('NEW_CHANNEL_FOR_USER')
    publishNewChannelForUser: Publisher<NewChannelForUserPayload>
  ): Promise<Channel> {
    try {
      if (!user) throw new Error('You are not authenticated.');

      const channel = new Channel();
      channel.title = channelInput.title;
      channel.users = Promise.resolve(users);

      await channel.save();

      publishNewChannelForUser({ users, channel });

      return channel;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Sub to get all new channels
  @Subscription({ topics: 'NEW_CHANNEL' })
  newChannel(@Root() newChannelPayload: NewChannelPayload): Channel {
    return newChannelPayload.channel;
  }

  // Sub to get all new channel where user is
  @Subscription({
    topics: 'NEW_CHANNEL_FOR_USER',
    filter: ({ payload, args }) => {
      const isUserInChannelsUserList = payload.users.some(
        (payloadUser: AppUser) => payloadUser.id === args.userId
      );

      return isUserInChannelsUserList;
    },
  })
  newChannelForUser(
    @Root() newChannelForUserPayload: NewChannelForUserPayload,
    @Arg('userId') userId: string
  ): Channel {
    return newChannelForUserPayload.channel;
  }
}
