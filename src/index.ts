import express from "express";
import pgPromise from 'pg-promise';

import Sequences from './Sequences';

const app = express();
const port = process.env.PORT || 80;

const pgp = pgPromise();
const db = pgp('postgres://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME + '?ssl=true');

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/add/:x/:y", (req, res) => {
  res.send(String(Sequences.add(+req.params.x, +req.params.y)));
});

app.get("/factorial/:x", (req, res) => {
  res.send(String(Sequences.factorial(+req.params.x)));
});

app.get("/fibonacci/:x", (req, res) => {
  res.send(String(Sequences.fibonacci(+req.params.x)));
});

app.get("/select1/:col", (req, res) => {
  db.any('SELECT $1:name FROM test.table1', [req.params['col']])
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log("Error: " + error);
    });
});

app.get("/select2/:col", (req, res) => {
  db.any('SELECT * FROM test.table2', [req.params['col']])
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log("Error: " + error);
    });
});

app.get("/join", (req, res) => {
  db.any('SELECT * FROM test.table1 NATURAL JOIN test.table2')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log("Error: " + error);
    });
});


app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});