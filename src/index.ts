import express from 'express';

import request from 'request-promise';

import Database from './Database';
import Sequences from './Sequences';
import Bucket from './Bucket';

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/select1', (req, res) => {
  Database.db().any('SELECT * FROM test.table1')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/select1/:col', (req, res) => {
  Database.db().any('SELECT $1:name FROM test.table1', [req.params.col])
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/select2', (req, res) => {
  Database.db().any('SELECT * FROM test.table2')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/select2/:col', (req, res) => {
  Database.db().any('SELECT $1:name FROM test.table2', [req.params.col])
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/join', (req, res) => {
  Database.db().any('SELECT * FROM test.table1 NATURAL JOIN test.table2')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
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

