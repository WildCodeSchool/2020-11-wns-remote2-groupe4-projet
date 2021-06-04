import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import UserSession from './UserSession';
import Message from './Message';
import Channel from './Channel';
import CalendarEvent from './CalendarEvent';

@Entity()
@ObjectType()
export default class AppUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String, { nullable: true })
  firstname!: string;

  @Column()
  @Field(() => String, { nullable: true })
  lastname!: string;

  @Column()
  @Field(() => String)
  email!: string;

  @Column()
  password!: string;

  @Column()
  @Field(() => String)
  phone!: string;

  @Column()
  @Field(() => String)
  address!: string;

  @OneToMany(() => Message, (message) => message.author)
  @Field(() => [Message])
  messages!: Message[];

  @ManyToMany(() => Channel, (channel) => channel.users, {
    lazy: true,
  })
  @Field(() => [Channel])
  channels!: Promise<Channel[]>;

  @OneToMany(() => CalendarEvent, (CalendarEvent) => CalendarEvent.author)
  @Field(() => [CalendarEvent])
  eventsCreatedByUser!: Promise<CalendarEvent[]>;

  @ManyToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.users, {
    lazy: true,
  })
  @Field(() => [CalendarEvent])
  calendarEvents!: Promise<CalendarEvent[]>;
}

export async function getUserFromSessionId(
  sessionId: string
): Promise<AppUser | null> {
  const userSession = await UserSession.findOne(
    { uuid: sessionId },
    { relations: ['user'] }
  );
  const user = userSession ? userSession.user : null;
  return user;
}
