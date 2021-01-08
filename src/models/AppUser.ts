import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import UserSession from './UserSession';

@Entity()
@ObjectType()
export default class AppUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  firstname!: string;

  @Column()
  @Field(() => String)
  lastname!: string;

  @Column()
  @Field(() => String)
  email!: string;

  @Column()
  @Field(() => String)
  password!: string;

  @Column()
  @Field(() => String)
  phone!: string;

  @Column()
  @Field(() => String)
  address!: string;
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
