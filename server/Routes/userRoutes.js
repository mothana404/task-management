const express = require('express');
const router = express.Router();
const usersConstrollers = require('../Controllers/usersControllers');

router.post('/register', usersConstrollers.createUser);
router.post('/login', usersConstrollers.loginUser);

module.exports = router;