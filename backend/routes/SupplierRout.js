const {Supplier , SupplierCount , UserSupplierPost , deleteSuplier , SupplierEdit } = require('../controllers/supplier/supplierController')
const authenticateToken = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router(); 
const { validateUserSupplierPost } = require('../middleware/userSupplierPost');

router.get('/', authenticateToken , Supplier);
router.get('/count',authenticateToken, SupplierCount);
router.post('/',validateUserSupplierPost, authenticateToken , UserSupplierPost);
router.delete('/:id',authenticateToken , deleteSuplier )
router.put("/:id" , authenticateToken , SupplierEdit)
module.exports = router; 