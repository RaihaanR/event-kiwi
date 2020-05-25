import express from 'express';

import Database from './Database';
import Sequences from './Sequences';

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

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

