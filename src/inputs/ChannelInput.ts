import { InputType, Field } from 'type-graphql';
import AppUser from '../models/AppUser';
import Message from '../models/Message';

@InputType()
export class CreateChannelInput {
  @Field()
  title!: string;
}

@InputType()
export class UpdateChannelInput {
  @Field(() => [AppUser], { nullable: true })
  users?: AppUser[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}
