const {createCustomer , getCustomers , deleteCustomer , updateCustomer} = require('../controllers/customer/customerController')
const authenticateToken = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router(); 

router.get('/',authenticateToken, getCustomers);

// Create a new contact
router.post('/',authenticateToken,createCustomer);


router.delete('/:id' , authenticateToken , deleteCustomer)

router.put("/:id" , authenticateToken , updateCustomer)

module.exports = router; 