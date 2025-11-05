const express = require('express');
const router = express.Router();

const userService  = require('../services/users');
const { useReducer } = require('react');

// GET /users
router.get('/', (req, res) => {
  res.json({ message: 'Users API endpoint OK' });
});
// GET /users/:id
router.get('/:id',private.checkJWT , userService.getById);

// PUT /users/add
router.put('/add', userService.add);

// PATCH /users/update
router.patch('/update', private.checkJWTn, userService.update)

// DELETE /users/delete
router.delete('/delete', private.checkJWTn, userService.delete);

// POST /users/authenticate
router.post('/authenticate', userService.authenticate);

module.exports = router;