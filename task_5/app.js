const express = require("express");
const { join } = require("path");
const messages_module = require('./messages');

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(express.static(join(__dirname, 'assets')));

server.use(messages_module);

server.locals.messages = [];

server.use((err, req, res, next) => {
    res.status(err.code || 400).send({ message: err.message || err });
});

const PORT = process.env.PORT || 4300;

server.listen(PORT, 'localhost', () => {
    console.log(`Server is running on ${PORT}`);
})



