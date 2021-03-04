import { hash, compare } from 'bcrypt';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import AppUser from '../models/AppUser';
import { CreateUserInput, UpdateUserInput } from '../inputs/UserInput';
import CreateSessionInput from '../inputs/CreateSessionInput';
import UserSession from '../models/UserSession';

@Resolver()
export default class UserResolver {
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
    data.password = await hash(data.password, 10);

    const appUser = AppUser.create(data);
    if (!appUser) throw new Error('impossible de créer un user');
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

  @Mutation(() => AppUser)
  async createSession(
    @Arg('input') input: CreateSessionInput,
    @Ctx()
    { setSessionIdCookie }: { setSessionIdCookie: (id: string) => void }
  ): Promise<AppUser> {
    const { email, password } = input;
    const user = await AppUser.findOne({ email });
    const authenticationError = new Error(
      'Incorrect username and/or password.'
    );
    if (!user) throw authenticationError;

    const isPasswordMatching = await compare(password, user.password);
    if (!isPasswordMatching) throw authenticationError;

    const userSession = UserSession.create({ user });
    await userSession.save();
    setSessionIdCookie(userSession.uuid);
    return user;
  }
}
