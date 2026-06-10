const {loginUser , RegisterUser , GetUsers , DeleteUser , UpdateUser} = require('../controllers/casherController/casher')
const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router(); 

router.post('/login', loginUser);
router.post('/register' , RegisterUser);
router.get('/' ,authenticateToken, GetUsers)
router.delete('/:id' , authenticateToken , DeleteUser)
router.put('/update', authenticateToken , UpdateUser)
module.exports = router; 