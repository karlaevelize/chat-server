const { Router } = require("express");
const Message = require("./model");
const router = new Router();

router.get("/messages", (request, response, next) => {
  Message.findAll()
    .then(messages => response.send(messages))
    .catch(errors => next(errors));
});

module.exports = router;
