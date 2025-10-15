const express = require('express');
const router = express.Router();

const userService  = require('../services/users');
router.get('/:id', userService.getById);
router.put('/add', userService.add);
router.patch('/:id',userService.update);
router.delete('/:id', userService.delete);

// Ajout de la route /authenticate
router.post('/authenticate', userService.authenticate);

module.exports = router;