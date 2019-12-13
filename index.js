const express = require("express");
const bodyParser = require("body-parser");
const Sse = require("json-sse");
const Message = require("./message/model");
const messageRouter = require("./message/router");

const app = express();
const port = 4000;

const stream = new Sse();

app.get("/", (request, response) => {
  stream.send("hi");
  response.send("hello");
});

app.get("/stream", async (request, response, next) => {
  try {
    const messages = await Message.findAll();
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(messageRouter);

app.listen(port, () => console.log(`Hey, listening on port ${port}!`));
