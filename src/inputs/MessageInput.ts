import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  content!: string;

  @Field()
  channelId!: string;
}

@InputType()
export class UpdateMessageInput {
  @Field({ nullable: true })
  content?: string;
}
