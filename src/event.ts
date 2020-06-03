import Database from './database';

export default class Event {

  static async getPosts(eventId: number, start: number) {
    const result = await Database.getEventPosts(eventId, start);

    return result ? result : [];
  }

  static async goingStatus(userId: number, eventId: number) {
    const result = await Database.goingStatus(userId, eventId);

    return result ? result['status'] : 0;
  }

  static async setStatus(userId: number, eventId: number, status: number) {
    return await Database.setStatus(userId, eventId, status);
  }

  static async listCalendarView(userId: number) {
    const result = await Database.listEventsSubscribed(userId);

    if (result) {
      return result.map(e => { return {
        id: e.event_id,
        start: e.start_datetime,
        end: e.end_datetime,
        location: e.location,
        name: e.event_name,
        organiser: {
          colour: e.colour,
          id: e.society_id,
          name: e.society_name,
          short: e.short_name
        },
        status: e.status
      }});
    } else {
      return [];
    }
  }
}

