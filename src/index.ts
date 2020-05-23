import express from "express";

import Sequences from './Sequences';

const app = express();
const port = 8080;

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

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});