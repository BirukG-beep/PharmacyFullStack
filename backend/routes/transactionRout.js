const {PostTransaction , TotalTransaction , IndMed} = require('../controllers/transactionController/transactionController')
const authenticateToken = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router(); 

router.post('/', authenticateToken , PostTransaction);
router.get('/',authenticateToken , TotalTransaction);
router.get('/transactions',authenticateToken, IndMed);
module.exports = router; 