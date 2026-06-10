const express = require('express');
const router = express.Router(); 
const authenticateToken = require('../middleware/authMiddleware');
const { 
  CosmosalesTransaction, IndCosmo, CosmoTransactionDelete, CosmoDelete, 
  EditCosmo, Cosmos, PostCosmo, GetSell  , CosmoTransactionAdd
} = require('../controllers/cosmoSales/Consmo');

// Define routes using `router`
router.post('/salesTransaction',authenticateToken, CosmosalesTransaction);
router.post('/CosmoTransactionAdd',authenticateToken, CosmoTransactionAdd);
router.post('/Cosmo',authenticateToken, PostCosmo);
router.get('/',authenticateToken, Cosmos);
router.get('/Cosmo/:id',authenticateToken, IndCosmo);
router.put('/Cosmo/:id',authenticateToken, EditCosmo);
router.delete('/Cosmo/:id',authenticateToken, CosmoDelete);
router.get('/salesTransaction',authenticateToken, GetSell);
router.delete('/CosmoTransactionDelete',authenticateToken, CosmoTransactionDelete);

module.exports = router; 
