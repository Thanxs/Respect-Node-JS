const { Router } = require("express");
const { authUser } = require('./auth.controller');
const { authUserValidation } = require('./auth.validations');

const { validate } = require('../middleware');

const router = Router();

router.post('/login', validate(authUserValidation), authUser);

module.exports = router;