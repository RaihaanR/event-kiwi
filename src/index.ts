import express from 'express';
import cors from 'cors';
import request from 'request-promise';
import { errors } from 'pg-promise';

import Bucket from './bucket';
import Database from './database';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

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

app.get('/auth/:token', async (req, res) => {
  let token = req.params.token;
  const options = {
    method: 'GET',
    uri: 'https://graph.microsoft.com/v1.0/me',
    auth: {
      'bearer': token
    }
  };
  request(options).then(body => {
    const user = JSON.parse(body);
    let result = {
      status: 1,
      body: {
        firstname: user.givenName,
        surname: user.surname,
        mail: user.mail
      }
    };
    res.send(result);
  }).catch(err => {
    let result = {
      status: 0,
      body: "ERROR"
    };
    res.send(result);
  });
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

