const users = require('../controllers/users.controller.js');
const router = require('express').Router();
const validationMiddleware = require('../validationSchemas/validationMiddleware.js');
const createUserSchema = require('../validationSchemas/createUser');
const updateUserSchema = require('../validationSchemas/updateUser');

// Get User Route
router.get('/:id', users.getUserHandler);

// All User Route
router.get('/', users.allUsersHandler);

// Add User Route
router.post('/', validationMiddleware(createUserSchema), users.addUserHandler);

// Update User Route
router.put('/:id', validationMiddleware(updateUserSchema), users.updateUserHandler);

// Delete User Route
router.delete('/:id', users.deleteUserHandler);

module.exports = router;
