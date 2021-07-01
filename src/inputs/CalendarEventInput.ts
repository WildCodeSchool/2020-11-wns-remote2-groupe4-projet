import { Field, InputType } from 'type-graphql';

@InputType()
export class CalendarEventIdInput {
  @Field(() => String)
  id!: string;
}

@InputType()
export class CreateCalendarEventInput {
  @Field()
  eventTitle!: string;

  @Field()
  eventStart!: Date;

  @Field()
  eventEnd!: Date;

  @Field()
  eventContent!: string;

  @Field()
  eventAllDay!: boolean;
}

@InputType()
export class UpdateCalendarEventInput {
  @Field({ nullable: true })
  eventTitle?: string;

  @Field({ nullable: true })
  eventStart?: Date;

  @Field({ nullable: true })
  eventEnd?: Date;

  @Field({ nullable: true })
  eventContent?: string;

  @Field({ nullable: true })
  eventAllDay?: boolean;
}
