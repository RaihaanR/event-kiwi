import express from 'express';
import cors from 'cors';
import request from 'request-promise';

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

app.get('/events/details/:id', async (req, res) => {
  try {
    res.send(await Database.getEventDetails(+req.params.id));
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/mirror/:name/:url', (req, res) => {
  const options = {
    uri: req.params.url,
    encoding: null
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.send('Error (' + error + ') [' + response.statusCode + ']');
    } else {
      Bucket.uploadFile(req.params.name, 0, body, res);
    }
  });
});

app.get('/file/get/:key', (req, res) => {
  Bucket.downloadByKey(req, res);
});

app.get('/file/list/:society', (req, res) => {
  Bucket.listBySociety(req, res);
});

app.get('/events/suggested/:id', async (req, res) => {
  try {
    let event = await Database.getEventDetails(+req.params.id);
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

app.get('/events/resources/:id', async (req, res) => {
  let empty = [];
  try {
    const event = await Database.db().oneOrNone('SELECT * FROM event WHERE event_id = $1', [+req.params.id]);
    if (event) {
      let resources = event['event_resources'];
      if (resources.length === 0) {
        res.send(empty);
      } else {
        res.send(await Database.getFilesByIds(resources));
      }
    } else {
      res.send(empty);
    }
  } catch (err) {
    res.send(empty)
  }
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

