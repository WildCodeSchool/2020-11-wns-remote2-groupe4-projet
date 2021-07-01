import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import CalendarEvent from '../models/CalendarEvent';
import {
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
} from '../inputs/CalendarEventInput';
import AppUser from '../models/AppUser';

@Resolver()
export default class CalendarEventResolver {
  @Query(() => CalendarEvent)
  calendarEvent(@Arg('id') id: string): Promise<CalendarEvent | undefined> {
    return CalendarEvent.findOne(id);
  }

  @Query(() => [CalendarEvent])
  calendarEvents(): Promise<CalendarEvent[]> {
    return CalendarEvent.find();
  }

  @Mutation(() => CalendarEvent)
  async createCalendarEvent(
    @Arg('data') data: CreateCalendarEventInput,
    @Ctx() { user }: { user: AppUser | null }
  ): Promise<CalendarEvent | undefined> {
    const calendarEvent = CalendarEvent.create(data);
    if (!user) throw new Error('You are not authenticated.');
    if (!calendarEvent) throw new Error("impossible de créer l'évènement");
    calendarEvent.author = Promise.resolve(user);
    await calendarEvent.save();
    return calendarEvent;
  }

  @Mutation(() => CalendarEvent)
  async updateCalendarEvent(
    @Arg('id') id: string,
    @Arg('data') data: UpdateCalendarEventInput
  ): Promise<CalendarEvent | undefined> {
    const eventCalendar = await CalendarEvent.findOne(id);
    if (!eventCalendar) throw new Error("There's no event with this id");

    Object.assign(eventCalendar, data);

    await eventCalendar.save();
    return eventCalendar;
  }

  @Mutation(() => [CalendarEvent])
  async deleteAllCalendarEvents(): Promise<string> {
    const allCalendarEventsToDelete = await CalendarEvent.find();
    if (!allCalendarEventsToDelete) throw new Error("C'est vide ");
    await CalendarEvent.remove(allCalendarEventsToDelete);
    return 'tous les évènements ont été effacés';
  }
}
