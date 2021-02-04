import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import AppUser from './AppUser';
import Message from './Message';

@Entity()
@ObjectType()
export default class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  title!: string;

  @OneToMany(() => Message, (message) => message.channel)
  @Field(() => [Message])
  messages!: Message[];

  @ManyToMany(() => AppUser, (user) => user.channels, {
    lazy: true,
  })
  @JoinTable()
  @Field(() => [AppUser])
  users!: Promise<AppUser[]>;
}
