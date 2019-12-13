const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sse = require("json-sse");
const Message = require("./message/model");
const messageRouterFactory = require("./message/router");

const app = express();
const port = 4000;

const stream = new Sse();
const messageRouter = messageRouterFactory(stream);

const corsMiddleware = cors();
app.use(corsMiddleware);

app.get("/", (request, response) => {
  response.send("hello");
});

app.get("/stream", async (request, response, next) => {
  try {
    const messages = await Message.findAll(); // get array out of database
    const action = {
      type: "ALL_MESSAGES",
      payload: messages
    };
    const string = JSON.stringify(action); // convert array into string - serialize it
    stream.updateInit(string); // prepare string to be sent to the client right after they connect
    stream.init(request, response); // connect the user to the strem
  } catch (error) {
    next(error); // handle any errors
  }
});

const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(messageRouter);

app.listen(port, () => console.log(`Hey, listening on port ${port}!`));
