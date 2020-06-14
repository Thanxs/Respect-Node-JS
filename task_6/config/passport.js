const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { compare } = require('bcryptjs');

const UsersModel = require('../api/users/users.model');
module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            UsersModel.findOne({ email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered!'});
                }

                compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password is incorrect!' });
                    }
                })
            }).catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UsersModel.findById(id, (err, user) => {
            done(err, user);
        });
    });
}