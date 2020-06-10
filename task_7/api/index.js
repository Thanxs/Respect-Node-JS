const { Router } = require('express');
const passport = require("passport");

const router = Router();

router.use('/auth', require('./auth/index'));

router.use('/users', require('./users/index'));

router.use('/messages', require('./messages/index'));

router.use((err, req, res, next) => {
  let e = { message: "" };
  if (err.joi) {
    e = err.joi.details;
  } else if (err.name === "MongoError") {
    e.message = err.errmsg;
  } else {
    e = err;
  }
  if (!Array.isArray(e)) {
    e = [e];
  }
  res.status(e.status || 400).send(e);
});

module.exports = router;