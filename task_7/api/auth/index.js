const { Router } = require('express');
const router = Router();
const { validate } = require('../middlewares');
const { authUser } = require('./auth.controller');
const { authUserValidation } = require('./auth.validations');

router.get('/login', (req, res) => res.render('login'));
router.post('/login', validate(authUserValidation), authUser);

module.exports = router;