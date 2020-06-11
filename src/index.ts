import express from 'express';
import cors from 'cors';
import request from 'request-promise';
import bodyParser from 'body-parser';
import fileUpload, { UploadedFile } from 'express-fileupload'

import Bucket from './bucket';
import Database from './database';
import Auth from './auth';
import Profile from './profile';
import Event from './event';

const app = express();
const port = process.env.PORT || 8080;

const empty = [];
const nothing = {};

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('No access');
});

app.get('/societies/search', async (req, res) => {
  const term = String(req.query.q).toLowerCase();
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    res.send(await Database.searchSocieties(term, userId));
  }
});

app.get('/societies/:option/:societyId', async (req, res) => {
  const societyId = +req.params.societyId;
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    switch (req.params.option) {
      case 'follow': {
        await Profile.setSocietyStatus(userId, societyId, 1);
        break;
      }
      case 'unfollow': {
        await Profile.setSocietyStatus(userId, societyId, 0);
        break;
      }
    }

    res.send('Success');
  }
});

app.post('/events/edit/:eventId', async (req, res) => {
  const eventId = +req.params.eventId;
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    const name = req.body.name;
    const location = req.body.location;
    const desc = req.body.desc;
    const privacy = req.body.privacy;
    const tags = req.body.tags;
    const start = new Date(req.body.start);
    const end = new Date(req.body.end);
    const img = req.body.img;
    res.send(await Event.editEvent(userId, eventId, name, location, desc, privacy, tags, start, end, img));
  }
});

app.get('/events/delete/:eventId', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send(await Event.deleteEvent(+req.params.eventId, userId));
  }
})

app.post('/events/create', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    const societyId = await Profile.getSocietyFromOwner(userId);
    if (societyId > 0) {
      const name = req.body.name;
      const location = req.body.location;
      const desc = req.body.desc;
      const privacy = req.body.privacy;
      const tags = req.body.tags;
      const start = new Date(req.body.start);
      const end = new Date(req.body.end);
      const img = req.body.img;
      res.send(await Event.createEvent(societyId, name, location, desc, privacy, tags, start, end, img));
    } else {
      res.status(403);
      res.send("Not a society");
    }
  }
});

app.get('/events/cards/all', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    res.send(await Database.getRelevantEventCards(userId, +req.query.n));
  }
});

app.get('/events/details/:eventId', async (req, res) => {
  try {
    const eventId = +req.params.eventId;
    const userId = await Auth.uidFromBearer(req.headers.authorization);

    res.send(await Event.getDetails(eventId, userId));
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/events/:option/:eventId', async (req, res) => {
  const eventId = +req.params.eventId;
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    switch (req.params.option) {
      case 'going': {
        await Event.setStatus(userId, eventId, 2);
        break;
      }
      case 'interested': {
        await Event.setStatus(userId, eventId, 1);
        break;
      }
      case 'none': {
        await Event.setStatus(userId, eventId, 0);
        break;
      }
    }

    res.send('Success');
  }
});

app.post('/events/posts/:eventId/new', async (req, res) => {
  const eventId = +req.params.eventId;
  const userId = await Auth.uidFromBearer(req.headers.authorization);
  const content = req.body.content;

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send(await Event.putPost(userId, eventId, content));
  }
});

app.get('/events/posts/delete/:postId', async (req, res) => {
  const postId = +req.params.postId;
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send(await Event.deletePost(userId, postId));
  }
})

app.get('/events/posts/:eventId/:start', async (req, res) => {
  const eventId = +req.params.eventId;
  const start = +req.params.start;

  const posts = await Event.getPosts(eventId, start);
  const max = posts.map(e => e.id).reduce((acc, cur) => acc > cur ? acc : cur, 0);

  const result = {
    posts: posts,
    last: max
  };

  res.send(result);
});

app.get('/events/suggested/:eventId', async (req, res) => {
  try {
    const event = await Database.getEventDetails(+req.params.eventId);
    const all = await Database.getAllEventCardDetails();
    const filtered = all.filter(e =>
      e.id !== event.id && e.tags.some(t => event.tags.includes(t))
    );

    res.send(filtered);
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/events/search', async (req, res) => {
  const search_options = {
    general: req.query.q !== undefined ? req.query.q : '',
    society_name: req.query.society_name !== undefined ? req.query.society_name : '',
    tag: req.query.tag !== undefined ? req.query.tag : '',
    start: req.query.start !== undefined ? req.query.start : '',
    end: req.query.end !== undefined ? req.query.end : '',
    finished: req.query.finished !== undefined ? req.query.finished : '',
    offset: req.query.n,
  };

  try {
    res.send(await Database.searchEvents(search_options));
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.post('/file/add/:eventId', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send(await Event.modifyFile(+req.params.eventId, req.body.files, userId, true));
  }
});

app.post('/file/remove/:eventId', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send(await Event.modifyFile(+req.params.eventId, req.body.files, userId, false));
  }
});

app.get('/file/get/:key', (req, res) => {
  Bucket.downloadByKey(req, res, "files");
});

app.get('/file/delete/:key', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send(await Bucket.deleteFile(req.params.key, userId));
  }
});

app.post('/file/upload', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    const societyId = await Profile.getSocietyFromOwner(userId);
    if (societyId > 0) {
      if (!req.files.upload) {
        res.status(400);
        res.send("No file included");
      } else {
        let files: UploadedFile[] = [];
        if (req.files.upload instanceof Array) {
          files = req.files.upload;
        } else {
          files = [req.files.upload];
        }
        console.log(files);
        const mapped = await Promise.all(files.map(file => Bucket.uploadResource(file.name, societyId, file.data)));
        const results = mapped
          .filter(r => r.status === 1)
          .map(r => r.body);
        res.send(results);
      }
    } else {
      res.status(403);
      res.send("Not a society");
    }
  }
});

app.get('/img/get/:key', (req, res) => {
  Bucket.downloadByKey(req, res, "image_mirrors");
});

app.post('/img/upload', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    const societyId = await Profile.getSocietyFromOwner(userId);
    if (societyId > 0) {
      if (!req.files.upload) {
        res.status(400);
        res.send("No file included");
      } else {
        const file: any = req.files['upload'];
        res.send(await Bucket.uploadImage(file.name, societyId, file.data));
      }
    } else {
      res.status(403);
      res.send("Not a society");
    }
  }
});

app.get('/file/list', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    const societyId = await Profile.getSocietyFromOwner(userId);
    if (societyId > 0) {
      res.send(await Database.getFilesBySociety(societyId));
    } else {
      res.status(403);
      res.send("Not a society");
    }
  }
});

app.get('/auth/valid', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send("Success");
  }
});

app.post('/auth/new', async (req, res) => {
  res.send(await Auth.validateBearer(req.body.token));
});

app.get('/auth/end', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);
  await Auth.deleteToken(extract)

  res.send(nothing);
});

app.get('/auth/end/all', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);
  await Auth.deleteAllTokens(extract)

  res.send(nothing);
});

app.get('/auth/whoami', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);

  res.send(await Auth.loadUser(extract));
});

app.get('/profile/societies', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    res.send(await Profile.societies(userId));
  }
});

app.get('/profile/interests', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    res.send(await Profile.interests(userId));
  }
});

app.post('/profile/interests/add', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    Database.addInterest(userId, req.body.interest);
    res.send('Success');
  }
});

app.post('/profile/interests/delete', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    Database.removeInterest(userId, req.body.interest);
    res.send('Success');
  }
});

app.get('/profile/interests/search', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    res.send(await Database.countInterested(userId, req.query.q));
  }
});

app.get('/profile/all', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send('Invalid token');
  } else {
    const user = await Profile.info(userId);
    const result = {
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      societies: await Profile.societies(userId),
      interests: await Profile.interests(userId)
    }

    res.send(result);
  }
});

app.get('/calendar', async (req, res) => {
  const userId = await Auth.uidFromBearer(req.headers.authorization);

  if (userId === -1) {
    res.status(403);
    res.send("Invalid token");
  } else {
    res.send(await Event.listCalendarView(userId));
  }
});

app.get('/mirror/:name/:uri', (req, res) => {
  const options = {
    uri: req.params.uri,
    encoding: null
  };

  request(options, async (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.send('Error (' + error + ') . + response.statusCode + ');
    } else {
      res.send(await Bucket.uploadResource(req.params.name, 0, body));
    }
  });
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

