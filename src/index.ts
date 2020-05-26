import express from 'express';

import request from 'request-promise';

import Bucket from './bucket';
import Database from './database';
import Sequences from './sequences';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/select/all/table1', async (req, res) => {
  try {
    res.send(await Database.allTable1());
  } catch (error) {
    res.send('Error occurred');
    console.log(error);
  }
});

app.get('/select/all/table2', async (req, res) => {
  try {
    res.send(await Database.allTable2());
  } catch (error) {
    res.send('Error occurred');
    console.log(error);
  }
});

app.get('/select/:col/table1', async (req, res) => {
  try {
    res.send(await Database.getColTable1(req.params.col));
  } catch (error) {
    res.send('Error occurred');
    console.log(error);
  }
});

app.get('/select/:col/table2', async (req, res) => {
  try {
    res.send(await Database.getColTable2(req.params.col));
  } catch (error) {
    res.send('Error occurred');
    console.log(error);
  }
});

app.get('/join', async (req, res) => {
  try {
    res.send(await Database.joinTable1Table2());
  } catch (error) {
    res.send('Error occurred');
    console.log(error);
  }
});

app.get("/factorial/:x", (req, res) => {
  res.send(String(Sequences.factorial(+req.params.x)));
});

app.get("/fibonacci/:x", (req, res) => {
  res.send(String(Sequences.fibonacci(+req.params.x)));
});

app.get("/mirror/:url", (req, res) => {
  const options = {
    uri: req.params.url,
    encoding: null
  };
  request(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      res.send("Error (" + error + ") [" + response.statusCode + "]");
    } else {
      let params = {
        Bucket: Bucket.bucketName(),
        Key: 'exampleFile',
        Body: body
      };
      Bucket.s3().putObject(params, (perr, pres) => {
        if (perr) {
          res.send("Error! " + "--" + body + "--" + perr);
        } else {
          res.send("Success!" + req.params.url);
        }
      });
    }
  });
});

app.get("/btest", (req, res) => {
  let params = {
    Bucket: Bucket.bucketName(),
    Key: '_test'
  };
  Bucket.s3().getObject(params, (err, data) => {
    res.send(data.Body.toString('utf-8').trim() === "accessed!");
  });
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

