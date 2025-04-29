import express from "express";

const app = express();

app.use("/", (request, response) => {
  response.sendStatus(200);
});

app.use("/check", (_, response) => {
  response.sendStatus(200);
});

app.listen(process.argv[2] || 9000, () => {
  console.log("Server is listening...");
});
