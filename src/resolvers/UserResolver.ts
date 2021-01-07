import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import AppUser from '../models/AppUser';
import { CreateUserInput, UpdateUserInput } from '../inputs/UserInput';

@Resolver()
export default class UserResoler {
  @Query(() => AppUser)
  user(@Arg('id') id: string): Promise<AppUser | undefined> {
    return AppUser.findOne(id);
  }

  @Query(() => [AppUser])
  users(): Promise<AppUser[]> {
    return AppUser.find();
  }

  @Mutation(() => AppUser)
  async createUser(@Arg('data') data: CreateUserInput): Promise<AppUser> {
    const appUser = AppUser.create(data);
    await appUser.save();
    return appUser;
  }

  @Mutation(() => AppUser)
  async updateUser(
    @Arg('id') id: string,
    @Arg('data') data: UpdateUserInput
  ): Promise<AppUser> {
    const appUser = await AppUser.findOne(id);

    if (!appUser) throw new Error("This user doesn't exist");

    Object.assign(appUser, data);

    await appUser.save();
    return appUser;
  }

  @Mutation(() => AppUser)
  async deleteUser(@Arg('id') id: string): Promise<AppUser> {
    const appUser = await AppUser.findOne(id);

    if (!appUser) throw new Error("This user doesn't exist");

    await AppUser.remove(appUser);
    return appUser;
  }
}
