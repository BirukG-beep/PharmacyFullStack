const {UserCount } = require('../controllers/UserController.js')
const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router(); 

router.get('/userCount',authenticateToken, UserCount);
module.exports = router; 