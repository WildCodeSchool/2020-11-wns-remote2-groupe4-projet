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

@Resolver()
export default class ChannelResolver {
  //get all channels
  @Query(() => [Channel])
  channels(): Promise<Channel[]> {
    return Channel.find();
  }

  //get channel by id
  @Query(() => Channel)
  channelById(@Arg('id') id: string): Promise<Channel | undefined> {
    return Channel.findOne(id);
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
