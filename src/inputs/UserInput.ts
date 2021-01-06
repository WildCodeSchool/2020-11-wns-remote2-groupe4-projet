import { Field, InputType } from 'type-graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  @MinLength(8)
  password!: string;

  @Field()
  phone!: string;

  @Field()
  address!: string;
}

export class UpdateUserInput {
  @Field()
  id!: string;

  @Field()
  firstname?: string;

  @Field()
  lastname?: string;

  @Field()
  email?: string;

  @Field()
  @MinLength(8)
  password?: string;

  @Field()
  phone?: string;

  @Field()
  address?: string;
}
