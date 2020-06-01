import express from 'express';
import cors from 'cors';
import request from 'request-promise';
import { errors } from 'pg-promise';
import bodyParser from 'body-parser';

import Bucket from './bucket';
import Database from './database';
import Auth from './auth';
import Profile from './profile';

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
    res.send(await Database.getEventDetails(+req.params['eventId']));
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/events/resources/:eventId', async (req, res) => {
  try {
    res.send(await Database.getFilesByEvent(+req.params['eventId']));
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/events/suggested/:eventId', async (req, res) => {
  try {
    let event = await Database.getEventDetails(+req.params['eventId']);
    let tags = event.tags;
    let all = await Database.getAllEventCardDetails();

    let filtered = all.filter(e =>
      e.id !== event.id && e.tags.some(t => tags.includes(t))
    );
    res.send(filtered);
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
  res.send(await Auth.validateBearer(req.body.token));
});

app.get('/auth/end', async (req, res) => {
  let extract = Auth.extractBearer(req.headers.authorization);
  await Auth.deleteToken(extract)
  res.send(nothing);
});

app.get('/auth/whoami', async (req, res) => {
  let extract = Auth.extractBearer(req.headers.authorization);
  res.send(await Auth.loadUser(extract));
});

app.get('/profile/societies', async (req, res) => {
  let result = empty;
  let extract = Auth.extractBearer(req.headers.authorization);
  if (extract !== "") {
    const user = await Profile.basicInfo(extract);
    if (user) {
      const societies = await Profile.societies(user.user_id);
      if (societies) {
        result = societies;
      }
    }
  }
  res.send(result);
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

