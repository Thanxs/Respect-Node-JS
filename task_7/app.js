const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { join } = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const messages_module = require('./messages');

const app = express();

require('./config/passport')(passport);

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.set('debug', true);
mongoose.connection.on('error', (e) => {
    console.log('MongoDB error: ', e);
    process.exit(1);
});

app.use('/assets', express.static(join(__dirname, 'assets')));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ static: false }));

app.use(session({
    secret: 'secret Alex chat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.locals.users = [];

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(messages_module);

app.use(function(err, req, res, next) {
    res.status(err.code || 400).send({ message: err.message || err });
});

app.use('/', require('./api/index'));
app.use('/users', require('./api/users/index'));
app.use('/auth', require('./api/auth/index'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
