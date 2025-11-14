const express = require('express');
const router = express.Router();
const private = require('../middleware/private');
const reservationService = require('../services/reservation');

// GET /reservation
router.get('/', private.checkJWT, reservationService.getAll);

// POST /reservation
router.post('/', private.checkJWT, reservationService.add);

module.exports = router;
