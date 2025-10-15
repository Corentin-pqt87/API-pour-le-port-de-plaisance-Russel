const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const mongodb = require('./db/mongo');

const usersRouter = require('./routes/users');


mongodb.initClientDbConnection();

const app = express();
app.use('/users', usersRouter);
app.use(cors({
    exposedHeaders: ['Authorization']
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);

app.use(function(req, res, next) {
    res.status(404).json({
        name: 'API',
        version: '1.0',
        status: 404,
        message: 'not_found'
    });
});


// page d'accueil
app.get('/html', (req, res) => {
    res.type('text/html');
    res.send('<h1>API pour le port de plaisance Russel</h1>');
});

// route login
const userService = require('./services/users');
app.post('/login', userService.authenticate);

module.exports = app;