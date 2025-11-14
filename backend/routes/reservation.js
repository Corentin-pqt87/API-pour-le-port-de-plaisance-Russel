const express = require('express');
const router = express.Router();
const private = require('../middleware/private');
const reservationService = require('../services/reservation');

// GET /reservation
router.get('/', private.checkJWT, reservationService.getAll);

// POST /reservation
router.post('/', private.checkJWT, reservationService.add);

// PATCH /reservation/:id 
router.patch('/:id', private.checkJWT, reservationService.update);

// DELETE /reservation/:id 
router.delete('/:id', private.checkJWT, reservationService.delete);

module.exports = router;
