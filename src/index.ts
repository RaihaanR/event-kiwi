import express from 'express';
const app = express();
const port = 8080;

import pgPromise from 'pg-promise';
const pgp = pgPromise();
const dbOptions = {
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  host: process.env.DBHOST,
  port: parseInt(process.env.DBPORT, 10),
  database: process.env.DBNAME,
  ssl: true
};
const db = pgp(dbOptions);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/select1", (req, res) => {
  db.any('SELECT * FROM test.table1')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log("Error: " + error);
    });
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

app.get("/select2", (req, res) => {
  db.any('SELECT * FROM test.table2')
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      console.log("Error: " + error);
    });
});

app.get("/select2/:col", (req, res) => {
  db.any('SELECT $1:name FROM test.table2', [req.params['col']])
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
  console.log(`server started at http://localhost:${port}`);
});

