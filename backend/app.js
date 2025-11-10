require('dotenv').config({ path: './env/.env' });

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongodb = require('./db/mongo');

mongodb.initClientDbConnection();

const app = express();
// Déclaration des middlewares utilisées par l'application
app.use(cors({ exposedHeaders: ['Authorization'],
    origin: '*'
 }));
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
/**
 * Lien ver un pages non existante
 * @param {*} req
 * @param {*} res
 */
app.use((req, res) => {
    res.status(404).json({
        name: 'API',
        version: '1.0',
        status: 404,
        message: 'not_found'
    });
});

module.exports = app;
