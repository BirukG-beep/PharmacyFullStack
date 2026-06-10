
const {DeleteCustomer , Purchase , CustomerDelete, PurchaseDelete , GetCustomer , PostCustomer , CountCustomer } = require('../controllers/PermanentCustomer/Customer')
const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router(); 

router.delete('/api/customers', authenticateToken ,DeleteCustomer);
router.put('/:phone/purchases',authenticateToken, Purchase);
router.delete('/:phone',authenticateToken , CustomerDelete);
router.delete('/',authenticateToken , PurchaseDelete);
router.get('/',authenticateToken, GetCustomer);
router.get("/count" , authenticateToken , CountCustomer)
router.post('/',authenticateToken, PostCustomer)
module.exports = router; 

