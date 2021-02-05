import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateMessageInput, UpdateMessageInput } from '../inputs/MessageInput';
import AppUser from '../models/AppUser';
import Channel from '../models/Channel';
import Message from '../models/Message';

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

    if (!messagesByChannelId.length)
      throw new Error('No messages for this channel.');

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

    if (!messagesByAuthorId.length)
      throw new Error('No messages for this user.');

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

    if (!messagesByAuthorIdAndChannelId.length)
      throw new Error('No messages for this user on this channel.');

    return messagesByAuthorIdAndChannelId;
  }

  //create message
  @Mutation(() => Message)
  async createMessage(@Arg('data') data: CreateMessageInput): Promise<Message> {
    try {
      const user = await AppUser.findOne(data.authorId);
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
}
