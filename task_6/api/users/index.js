const express = require('express');
const { validate } = require('../middlewares');
const { registerUserValidation } = require('./users.validations');
const { registerUser } = require('./users.controller');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));

router.post('/register', registerUser);

module.exports = router;