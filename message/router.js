const { Router } = require("express");
const Message = require("./model");
const router = new Router();

// router.get("/messages", (request, response, next) => {
//   Message.findAll()
//     .then(messages => response.send(messages))
//     .catch(errors => next(errors));
// });

// router.post("/messages", (request, response, next) => {
//   Message.create(request.body)
//     .then(message => response.send(message))
//     .catch(errors => next(errors));
// });

router.get("/message", async (request, response, next) => {
  try {
    const messages = await Message.findAll();
    response.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/message", async (request, response, next) => {
  try {
    const message = await Message.create(request.body);
    response.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
