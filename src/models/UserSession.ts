import {
  Column,
  Generated,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import AppUser from './AppUser';

@Entity()
@ObjectType()
export default class UserSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id!: string;

  @Index()
  @Column()
  @Generated('uuid')
  uuid!: string;

  @ManyToOne(() => AppUser)
  user!: AppUser;
}
