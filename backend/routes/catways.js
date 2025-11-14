const express = require('express');
const router = express.Router();
const catwayService = require('../services/catways');
const private = require('../middleware/private'); // sécuriser la route

router.get('/', private.checkJWT, catwayService.getAllCatways);
router.get('/:number', private.checkJWT, catwayService.getCatwayByNumber);
router.post('/add', private.checkJWT, catwayService.addCatway);
router.patch('/:number', private.checkJWT, catwayService.updateCatwayState);
router.delete('/:number', private.checkJWT, catwayService.deleteCatway);

module.exports = router;
