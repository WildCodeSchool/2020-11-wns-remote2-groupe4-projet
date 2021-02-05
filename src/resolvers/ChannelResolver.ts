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
import Message from '../models/Message';

type NewChannelPayload = {
  channel: Channel;
};

@Resolver()
export default class ChannelResolver {
  //get all channels
  @Query(() => [Channel])
  channels(): Promise<Channel[]> {
    return Channel.find({ relations: ['messages'] });
  }

  //get channel by id
  @Query(() => Channel)
  channelById(@Arg('id') id: string): Promise<Channel | undefined> {
    return Channel.findOne(id, { relations: ['messages'] });
  }

  //get channel's users
  @Query(() => [AppUser])
  async channelUsers(@Arg('id') id: string): Promise<AppUser[] | undefined> {
    const channel = await Channel.findOne(id, { relations: ['messages'] });

    if (!channel) throw new Error('No channel found.');

    const channelUsers = channel.users;
    return channelUsers;
  }

  //get channel's messages
  @Query(() => [Message])
  async channelMessages(@Arg('id') id: string): Promise<Message[] | undefined> {
    const channel = await Channel.findOne(id, { relations: ['messages'] });

    if (!channel) throw new Error('No channel found.');

    const channelUsers = channel.messages;
    return channelUsers;
  }

  //create channel
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

  @Subscription({ topics: 'NEW_CHANNEL' })
  newChannel(@Root() newChannelPayload: NewChannelPayload): Channel {
    return newChannelPayload.channel;
  }
}
