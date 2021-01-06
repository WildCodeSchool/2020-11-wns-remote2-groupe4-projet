import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import User from '../models/User';
import { CreateUserInput, UpdateUserInput } from '../inputs/UserInput';

@Resolver()
export default class UserResoler {
  @Query(() => User)
  user(@Arg('id') id: string): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput): Promise<User> {
    const user = User.create(data);
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id') id: string,
    @Arg('data') data: UpdateUserInput
  ): Promise<User> {
    const user = await User.findOne(id);

    if (!user) throw new Error("This user doesn't exist");

    Object.assign(user, data);

    await user.save();
    return user;
  }
}
