const { Router } = require("express");
const Message = require("./model");
const router = new Router();

router.get("/messages", (request, response, next) => {
  Message.findAll()
    .then(messages => response.send(messages))
    .catch(errors => next(errors));
});

router.post("/messages", (request, response, next) => {
  Message.create(request.body)
    .then(message => response.send(message))
    .catch(errors => next(errors));
});

module.exports = router;
