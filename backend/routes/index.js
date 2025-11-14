var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const { version } = require('mongoose');

const catwayRoute = require('./catways');

/**
 * Route de connection a l'api
 * @async
 * @param {*} requestAnimationFrame
 * @param {*} res
 */
router.get('/', async (requestAnimationFrame, res) => {
    res.status(200).json({
        nam: process.env.APP_NAME,
        version: '1.0',
        status : 200,
        message: 'Bienvenue sur l\'API'
    });
});

router.use('/users', userRoute);

router.use('/catways', catwayRoute);

module.exports = router;