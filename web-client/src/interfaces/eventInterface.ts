export type EventFromDataInterface = {
  id: string;
  eventAllDay: boolean;
  eventContent: string;
  eventStart: Date;
  eventEnd: Date;
  eventTitle: string;
};

export type EventFormated = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};
