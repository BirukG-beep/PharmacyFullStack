const {MedicineGroupId } = require('../controllers/MedicineGroup/Medicinegroup')
const authenticateToken = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router(); 

router.get('/:id', authenticateToken, MedicineGroupId );
module.exports = router; 