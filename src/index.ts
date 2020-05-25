import express from 'express';
import pgPromise from 'pg-promise';

const app = express();
const port = process.env.PORT || 8080;

const pgp = pgPromise();
const dbOptions = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  ssl: true
};
const db = pgp(dbOptions);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/select1', (req, res) => {
  db.any('SELECT * FROM test.table1')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/select1/:col', (req, res) => {
  db.any('SELECT $1:name FROM test.table1', [req.params['col']])
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/select2', (req, res) => {
  db.any('SELECT * FROM test.table2')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/select2/:col', (req, res) => {
  db.any('SELECT $1:name FROM test.table2', [req.params['col']])
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.get('/join', (req, res) => {
  db.any('SELECT * FROM test.table1 NATURAL JOIN test.table2')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log('Error: ' + error);
    });
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});

