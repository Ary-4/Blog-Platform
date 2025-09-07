const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in
router.post('/login', loginUser);

module.exports = router;
