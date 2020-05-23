import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/add", (req, res) => {
  res.send(String(add(5, 3)));
});

function add(x: number, y: number): number {
  return x + y;
}

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});