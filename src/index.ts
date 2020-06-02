import express from 'express';
import cors from 'cors';
import request from 'request-promise';
import bodyParser from 'body-parser';

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/events/cards/all', async (req, res) => {
  try {
    res.send(await Database.getAllEventCardDetails());
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/events/details/:eventId', async (req, res) => {
  try {
    const eventId = +req.params['eventId'];
    const extract = Auth.extractBearer(req.headers.authorization);

    let going = -1;

    if (extract !== '') {
      const user = await Profile.basicInfo(extract);

      if (user) {
        going = await Event.goingStatus(user.user_id, eventId);
      }
    }

    const details = await Database.getEventDetails(eventId);
    const all = await Database.getAllEventCardDetails();

    details.resources = await Database.getFilesByEvent(eventId);
    details.posts = empty;
    details.going_status = going;
    details.similar_events = all.filter(e =>
      e.id !== details.id && e.tags.some(t => event['tags'].includes(t))
    );

    res.send(details);
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/events/suggested/:eventId', async (req, res) => {
  try {
    const event = await Database.getEventDetails(+req.params['eventId']);
    const all = await Database.getAllEventCardDetails();
    const tags = event['tags'];
    const filtered = all.filter(e =>
      e.id !== event.id && e.tags.some(t => tags.includes(t))
    );

    res.send(filtered);
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/events/search', async (req, res) => {
  try {
    res.send(await Database.searchEvents(req.query['q']));
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/mirror/:name/:uri', (req, res) => {
  const options = {
    uri: req.params['uri'],
    encoding: null
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.send('Error (' + error + ') [' + response.statusCode + ']');
    } else {
      Bucket.uploadFile(req.params['name'], 0, body, res);
    }
  });
});

app.get('/file/get/:key', (req, res) => {
  Bucket.downloadByKey(req, res);
});

app.get('/file/list/:societyId', async (req, res) => {
  try {
    res.send(await Database.getFilesBySociety(+req.params['societyId']));
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.post('/auth/new', async (req, res) => {
  res.send(await Auth.validateBearer(req.body['token']));
});

app.get('/auth/end', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);
  await Auth.deleteToken(extract)

  res.send(nothing);
});

app.get('/auth/whoami', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);

  res.send(await Auth.loadUser(extract));
});

app.get('/profile/societies', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);
  let result = empty;

  if (extract !== '') {
    const user = await Profile.basicInfo(extract);

    if (user) {
      result = await Profile.societies(user.user_id);
    }
  }

  res.send(result);
});

app.get('/profile/interests', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);
  let result = empty;

  if (extract !== '') {
    const user = await Profile.basicInfo(extract);

    if (user) {
      result = await Profile.interests(user.user_id);
    }
  }

  res.send(result);
});

// Does this need a return
app.post('/profile/add/interest', async (req, res) => {
  try {
    const extract = Auth.extractBearer(req.headers.authorization);

    if (extract !== '') {
      const user = await Profile.basicInfo(extract);

      if (user) {
        Database.addInterest(+user['user_id'], req.body['interest']);
      }
    }

    res.send('Success');
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

// Does this need a return
app.post('/profile/delete/interest', async (req, res) => {
  try {
    const extract = Auth.extractBearer(req.headers.authorization);

    if (extract !== '') {
      const user = await Profile.basicInfo(extract);

      if (user) {
        Database.removeInterest(+user['user_id'], req.body['interest']);
      }
    }

    res.send('Success');
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/profile/all', async (req, res) => {
  const extract = Auth.extractBearer(req.headers.authorization);
  let result = nothing;

  if (extract !== '') {
    const user = await Profile.basicInfo(extract);

    if (user) {
      result = {
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        societies: await Profile.societies(user.user_id),
        interests: await Profile.interests(user.user_id)
      };
    }
  }

  res.send(result);
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

