const { Router } = require('express');
const router = Router();
const { registerUser } = require('./users.controller');
const { registerUserValidation } = require('./users.validations');
const { validate } = require('../middlewares');

router.post('/register', validate(registerUserValidation), registerUser);

module.exports = router;