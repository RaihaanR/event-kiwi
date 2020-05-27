import express from 'express';
import cors from 'cors'
import request from 'request-promise';

import Bucket from './bucket';
import Database from './database';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/event-card-details', async (req, res) => {
  try {
    res.send(await Database.getAllEventCardDetails());
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/event-details/:id', async (req, res) => {
  try {
    const details = await Database.getEventDetails(+req.params.id);
    details['same_society_events'] = await Database.getEventCardDetailsBySocietyId(+details['society_id']);
    details['society'] = {'id': details['society_id'],
                          'society_name': details['society_name'],
                          'society_image_src': details['society_image_src'],
                          'colour': details['colour']};

    delete details['society_id'];
    delete details['society_name'];
    delete details['society_image_src'];
    delete details['colour'];

    res.send(details);
  } catch (err) {
    res.send('Error occurred');
    console.log(err);
  }
});

app.get('/mirror/:url', (req, res) => {
  const options = {
    uri: req.params.url,
    encoding: null
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.send('Error (' + error + ') [' + response.statusCode + ']');
    } else {
      const params = {
        Bucket: Bucket.bucketName(),
        Key: 'exampleFile',
        Body: body
      };

      Bucket.s3().putObject(params, (perr, pres) => {
        if (perr) {
          res.send('Error! ' + '--' + body + '--' + perr);
        } else {
          res.send('Success!' + req.params.url);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

