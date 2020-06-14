const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth.guard');


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
});

router.get('/', (req, res) => res.render('welcome'));

router.get('/chat', ensureAuthenticated, (req, res) => res.render('chat', {
    email: req.user.email
}));

module.exports = router;