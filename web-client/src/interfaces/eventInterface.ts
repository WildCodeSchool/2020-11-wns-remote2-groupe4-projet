export type EventFromDataInterface = {
  eventAllDay: boolean;
  eventContent: string;
  eventStart: Date;
  eventEnd: Date;
  eventTitle: string;
};

export type EventFormated = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};
