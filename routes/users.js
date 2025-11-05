const express = require('express');
const router = express.Router();

const userService  = require('../services/users');

// GET /users
router.get('/', (req, res) => {
  res.json({ message: 'Users API endpoint OK' });
});
// GET /users/:id
router.get('/:id', userService.getById);

// POST /users/authenticate
router.post('/authenticate', userService.authenticate);

// PUT /users/add
router.put('/add', userService.add);

// PATCH /users/:id
router.patch('/:id', userService.update);

// DELETE /users/:id
router.delete('/:id', userService.delete);

// route d'authentification
router.post('/authenticate', userService.authenticate);

module.exports = router;