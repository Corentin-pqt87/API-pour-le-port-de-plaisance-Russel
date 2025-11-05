require('dotenv').config({ path: './env/.env' });

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

var app = express();
// Déclaration des middlewares utilisées par l'application
app.use(cors({ exposedHeaders: ['Authorization'] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 
app.use('/users', usersRouter);   // toutes les routes /users/* passent par le router
app.use('/', indexRouter);

// page d'accueil
app.get('/html', (req, res) => {
    res.type('text/html');
    res.send('<h1>API pour le port de plaisance Russel</h1>');
});

// gestion des 404
app.use((req, res) => {
    res.status(404).json({
        name: 'API',
        version: '1.0',
        status: 404,
        message: 'not_found'
    });
});

module.exports = app;
