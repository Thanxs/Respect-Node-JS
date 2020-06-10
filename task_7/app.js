const express = require('express');
const { join } = require('path');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

nunjucks.configure(join(__dirname, 'templates'), {
    autoescape: true,
    express: app,
    watch: true
});

app.use('/assets', express.static(join(__dirname, 'assets')));

app.use(session({
    secret: 'alex chat secret messages',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24*60*60*1000 }
}));

app.locals.messages = [];

app.get('/', (req, res) => {
    res.render('index.nunjucks', { user: req.session.user })
});

app.get('/login', (req, res) => {
    res.render('login.nunjucks')
});

app.get('/messages', (req, res) => {
    res.render('messages.nunjucks')
});

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', require('./api/index'));

app.use((err, req, res, next) => {
    res.status(err.code || 400).send({ message: err.message || err });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});