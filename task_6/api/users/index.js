const { Router } = require("express");
const { registerUser } = require('./users.controller');
const { validate } = require('../middleware');
const { registerUserValidation } = require('./users.validations');

const router = Router();

router.post('/register', validate(registerUserValidation), registerUser);

module.exports = router;