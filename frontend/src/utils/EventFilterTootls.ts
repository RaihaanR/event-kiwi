import { CalendarEvent, EventGroupByDate, SocietyCal } from "../constants/types";
import { sameDay } from "./DateTimeTools";

export function groupByDate(events: CalendarEvent[]) {
  if (events.length == 0) {
    return [];
  }

  let currDate = events[0].datetimeStart
  const groupedItems: EventGroupByDate[] = [{
    date: currDate,
    events: []
  }];

  events.forEach((event) => {
    if (sameDay(currDate, event.datetimeStart)) {
      groupedItems[groupedItems.length - 1].events.push(event);
    } else {
      currDate = event.datetimeStart
      groupedItems.push({
        date: currDate,
        events: [event]
      })
    }
  })

  return groupedItems;
}

export const myEvent = (event: CalendarEvent, socId: string) => {
  return event.organiser.id === socId;
}

export const getSocs = (events: CalendarEvent[]) => {
  const socs = (events.map(e => e.organiser));
  let uniqueSocs: SocietyCal[] = []
  socs.forEach(s => {
    if (!uniqueSocs.some(soc => s.id === soc.id)) {
      uniqueSocs.push(s);
    }
  })
  return uniqueSocs;
}



export const applyFilters = (filters: (number)[], events: CalendarEvent[]) => {
  return events.filter(e => (filters.includes(-e.status - 1) && filters.includes(parseInt(e.organiser.id))));
}