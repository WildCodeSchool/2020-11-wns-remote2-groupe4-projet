import { Field, InputType } from 'type-graphql';

@InputType()
export class CalendarEventIdInput {
  @Field(() => String)
  id!: string;
}

@InputType()
export class CreateCalendarEventInput {
  @Field()
  eventId!: string;

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
