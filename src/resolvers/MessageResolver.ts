import {
  Arg,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { CreateMessageInput, UpdateMessageInput } from '../inputs/MessageInput';
import AppUser from '../models/AppUser';
import Channel from '../models/Channel';
import Message from '../models/Message';

type NewMessagePayload = {
  message: Message;
};

type NewChannelMessagePayload = {
  channelId: string;
  message: Message;
};

@Resolver()
export default class MessageResolver {
  //get one message
  @Query(() => Message)
  async message(@Arg('id') id: string): Promise<Message | undefined> {
    return Message.findOne(id);
  }

  //get all messages
  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return Message.find();
  }

  //get messages by channelId
  @Query(() => [Message])
  async messagesByChannelId(
    @Arg('channelId') channelId: string
  ): Promise<Message[] | undefined> {
    const messagesByChannelId = await Message.find({
      where: { channel: channelId },
    });

    return messagesByChannelId;
  }

  //get messages by authorId
  @Query(() => [Message])
  async messagesByAuthorId(
    @Arg('authorId') authorId: string
  ): Promise<Message[] | undefined> {
    const messagesByAuthorId = await Message.find({
      where: { author: authorId },
    });

    return messagesByAuthorId;
  }

  //get messages by authorId and channelId
  @Query(() => [Message])
  async messagesByAuthorIdAndChannelId(
    @Arg('authorId') authorId: string,
    @Arg('channelId') channelId: string
  ): Promise<Message[] | undefined> {
    const messagesByAuthorIdAndChannelId = await Message.find({
      where: { author: authorId, channel: channelId },
    });

    return messagesByAuthorIdAndChannelId;
  }

  //create message
  @Mutation(() => Message)
  async createMessage(
    @Arg('data') data: CreateMessageInput,
    @Ctx() context: { user: AppUser | null },
    @PubSub('NEW_MESSAGE') publishNewMessage: Publisher<NewMessagePayload>
  ): Promise<Message> {
    try {
      if (!context.user) throw new Error('You are not authenticated.');

      const user = await AppUser.findOne(context.user.id);
      if (!user) throw new Error('User not found.');

      const channel = await Channel.findOne(data.channelId);
      if (!channel) throw new Error('Channel not found.');

      if (!data.content || data.content.trim() === '')
        throw new Error('Message is empty.');

      const message = new Message();
      message.content = data.content;
      message.author = Promise.resolve(user);
      message.channel = Promise.resolve(channel);

      await message.save();

      publishNewMessage({ message });

      return message;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //create message
  @Mutation(() => Message)
  async createChannelMessage(
    @Arg('data') data: CreateMessageInput,
    @Ctx() context: { user: AppUser | null },
    @PubSub('NEW_CHANNEL_MESSAGE')
    publishNewChannelMessage: Publisher<NewChannelMessagePayload>
  ): Promise<Message> {
    try {
      if (!context.user) throw new Error('You are not authenticated.');
      console.log(context.user.id);
      const user = await AppUser.findOne(context.user.id);
      if (!user) throw new Error('User not found.');
      console.log(user);
      const channel = await Channel.findOne(data.channelId);
      if (!channel) throw new Error('Channel not found.');

      if (!data.content || data.content.trim() === '')
        throw new Error('Message is empty.');

      const message = new Message();
      message.content = data.content;
      message.author = Promise.resolve(user);
      message.channel = Promise.resolve(channel);

      await message.save();

      publishNewChannelMessage({ channelId: data.channelId, message });

      return message;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //update message
  @Mutation(() => Message)
  async updateMessage(
    @Arg('id') id: string,
    @Arg('contentUpdate') contentUpdate: UpdateMessageInput
  ): Promise<Message> {
    const message = await Message.findOne(id);
    if (!message) throw new Error('Message not found.');

    if (!contentUpdate.content || contentUpdate.content.trim() === '')
      throw new Error('Message is empty.');

    message.content = contentUpdate.content;
    await message.save();
    return message;
  }

  //delete message
  @Mutation(() => Message)
  async deleteMessage(@Arg('id') id: string): Promise<string> {
    const messageToDelete = await Message.findOne(id);

    if (!messageToDelete) throw new Error('Message not found.');

    await Message.remove(messageToDelete);
    return 'Message deleted.';
  }

  // Sub to get all new messages
  @Subscription({ topics: 'NEW_MESSAGE' })
  newMessage(@Root() newMessagePayload: NewMessagePayload): Message {
    return newMessagePayload.message;
  }

  // Sub to get all new messages of a channel
  @Subscription({
    topics: 'NEW_CHANNEL_MESSAGE',
    filter: ({ payload, args }) => payload.channelId === args.channelId,
  })
  newChannelMessage(
    @Root() newChannelMessagePayload: NewChannelMessagePayload,
    @Arg('channelId') channelId: string
  ): Message {
    return newChannelMessagePayload.message;
  }
}
