// routes/auth.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', [
    body('username').isString().isLength({ min: 3 }),
    body('email').isEmail(),
    body('phone').isString(),
    body('password').isLength({ min: 6 })
], registerUser);

router.post('/login', [
    body('email').isEmail(),
    body('password').isString()
], loginUser);

module.exports = router;