const express = require("express");
const { join } = require("path");
const nunjucks = require("nunjucks");
const api = require('./api/index');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app = express();

nunjucks.configure(join(__dirname, 'templates'), {
    express: app,
    watch: true,
    autoescape: true
});

mongoose.connect('mongodb://localhost:27017/contactbook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.set('debug', true);
mongoose.connection.on('error', (e) => {
    console.error("MongoDB error:", e);
    process.exit(1);
});

app.use('/assets', express.static(join(__dirname, 'assets')));

app.use(session({
    secret: "secret string",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        stringify: true
    })
  }));
  
app.get('/', (req, res) => {
    res.render('index.nunjucks', { user: req.session.user });
});

app.get('/login', (req, res) => {
    res.render('login.nunjucks', {});
});

app.use(express.json());
app.use('/api', api);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`Sever is running on port ${PORT}`)
});