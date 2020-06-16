const passport = require('passport');

exports.authUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/chat',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
}