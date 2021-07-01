import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import AppUser from './AppUser';

@Entity()
@ObjectType()
export default class CalendarEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  eventTitle!: string;

  @Column()
  @Field(() => Date)
  eventStart!: Date;

  @Column()
  @Field(() => Date)
  eventEnd!: Date;

  @Column()
  @Field(() => String)
  eventContent!: string;

  @Column()
  @Field(() => Boolean)
  eventAllDay!: boolean;

  @ManyToOne(() => AppUser, (user) => user.eventsCreatedByUser, {
    lazy: true,
  })
  @Field(() => AppUser)
  author!: Promise<AppUser>;

  @ManyToMany(() => AppUser, (user) => user.calendarEvents, {
    lazy: true,
  })
  @JoinTable()
  @Field(() => [AppUser])
  users!: Promise<AppUser[]>;
}
