import Database from './database';

export default class Event {

  static async deleteEvent(eventId: number, userId: number) {
    const result: any = {};

    try {
      const permission = await Database.canPost(userId, eventId);

      if (permission) {
        await Database.deleteEvent(eventId);
        result.status = 1;
        result.body = "Event deleted";
      } else {
        result.status = 0;
        result.body = "ERROR: you are not permitted to delete this event";
      }
    } catch (err) {
      result.status = 0;
      result.body = "ERROR: " + err;
    }

    return result;
  }

  static async modifyFile(eventId: number, files: string[], userId: number, add: boolean) {
    const result: any = {};

    try {
      const permission = await Database.canPost(userId, eventId);
      if (permission) {
        if (add) {
          console.log("HHHH");
          await Database.addFileToEvent(eventId, files);
        } else {
          await Database.removeFileFromEvent(eventId, files);
        }
        result.status = 1;
          console.log("HHHH");
        result.body = await Event.getDetails(eventId, userId);
          console.log("HHHH");
      } else {
        result.status = 0;
        result.body = "ERROR: you do not have permission to modify files on this event";
      }
    } catch (err) {
      result.status = 0;
      result.body = "ERROR: " + err;
    }

    return result;
  }

  static async getPosts(eventId: number, start: number) {
    const result = await Database.getEventPosts(eventId, start);

    if (result) {
      return result.map(p => { return {
        id: p.post_id,
        event: p.event_id,
        organiser: {
          id: p.society_id,
          name: p.society_name,
          short: p.short_name,
          image: p.society_image_src
        },
        time: p.post_time,
        body: p.body
      }});
    } else {
      return [];
    }
  }

  static async deletePost(userId: number, postId: number) {
    const result: any = {};

    try {
      const permission = await Database.canDeletePost(userId, postId);

      if (permission) {
        await Database.deletePost(postId);
        result.status = 1;
        result.body = "Post deleted";
      } else {
        result.status = 0;
        result.body = "ERROR: you are not permitted to delete posts on this event";
      }
    } catch (err) {
      result.status = 0;
      result.body = "ERROR: " + err;
    }

    return result;
  }

  static async putPost(userId: number, eventId: number, body: string) {
    const result: any = {};

    try {
      const permission = await Database.canPost(userId, eventId);
      if (permission) {
        const row = await Database.createPost(eventId, permission.society_id, body);
        result.status = 1;
        result.body = {
          id: row.post_id,
          event: row.event_id,
          organiser: {
            id: permission.society_id,
            name: permission.society_name,
            short: permission.short_name,
            image: permission.society_image_src
          },
          time: row.post_time,
          body: row.body
        };
      } else {
        result.status = 0;
        result.body = "ERROR: you do not have permission to post to this event";
      }
    } catch (err) {
      result.status = 0;
      result.body = "ERROR: " + err;
    }

    return result;
  }

  static async goingStatus(userId: number, eventId: number) {
    const result = await Database.goingStatus(userId, eventId);

    const owner = await Database.canPost(userId, eventId);

    if (owner) {
      return 3;
    } else {
      return result ? result['status'] : 0;
    }

  }

  static async createEvent(societyId: number, name: string, location: string, desc: string, privacy: number, tags: string[], start: Date, end: Date, img: string) {
    const result: any = {};

    try {
      const row = await Database.createEvent(societyId, name, location, desc, privacy, tags, start, end, img);
      const owner = await Database.getSocietyOwner(societyId);
      result.status = 1;
      result.body = await Event.getDetails(row.event_id, owner.owner);
    } catch (err) {
      result.status = 0;
      result.body = "ERROR: " + err;
    }

    return result;
  }

  static async editEvent(userId: number, eventId: number, name: string, location: string, desc: string, privacy: number, tags: string[], start: Date, end: Date, img: string) {
    const result: any = {};

    try {
      const owner = await Database.canPost(userId, eventId);

      if (owner) {
        await Database.editEvent(eventId, name, location, desc, privacy, tags, start, end, img);
        result.status = 1;
        result.body = await Event.getDetails(eventId, userId);
      } else {
        result.status = 0;
        result.body = "ERROR: you do not have permission to edit this event";
      }
    } catch (err) {
      result.status = 0;
      result.body = "ERROR: " + err;
    }

    return result;
  }

  static async getDetails(eventId: number, userId: number) {
    let going = (userId === -1) ? -1 : await Event.goingStatus(userId, eventId);

    const details = await Database.getEventDetails(eventId);
    const all = await Database.getAllEventCardDetails();
    details.resources = await Database.getFilesByEvent(eventId);
    details.going_status = going;
    details.similar_events = all.filter(e =>
      e.event_id !== details.event_id &&
      e.society.society_id !== details.society.society_id &&
      e.tags.some(t => details.tags.includes(t))
    );
    details.posts = [];

    const combined = (details.similar_events.concat(details.same_society_events)).map(e => e.event_id);
    const filtered = await Database.canView(combined, userId);

    details.similar_events = details.similar_events.filter(e => filtered.includes(e.event_id));
    details.same_society_events = details.same_society_events.filter(e => filtered.includes(e.event_id));

    return details
  }

  static async setStatus(userId: number, eventId: number, status: number) {
    return await Database.setStatus(userId, eventId, status);
  }

  static async listCalendarView(userId: number) {
    const result = await Database.listEventsSubscribed(userId);

    if (result) {
      const rows = result.map(e => { return {
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

      const filtered = await Database.canView(rows.map(c => c.id), userId);

      return rows.filter(r => filtered.includes(r.id));
    } else {
      return [];
    }
  }
}

