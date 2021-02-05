import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import AppUser from './AppUser';
import Channel from './Channel';

@Entity()
@ObjectType()
export default class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  content!: string;

  @ManyToOne(() => AppUser, (appUser) => appUser.messages, {
    lazy: true,
  })
  @Field(() => AppUser)
  author!: Promise<AppUser>;

  @ManyToOne(() => Channel, (channel) => channel.messages, {
    lazy: true,
  })
  @Field(() => Channel)
  channel!: Promise<Channel>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  sentAt!: Date;
}
