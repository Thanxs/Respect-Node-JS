const express = require('express');
const { validate } = require('../middlewares');
const { registerUserValidation } = require('./users.validations');
const { registerUser, getAllUsers } = require('./users.controller');
const { required } = require('@hapi/joi');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));

router.post('/register', registerUser);

router.get('/data', getAllUsers);

module.exports = router;