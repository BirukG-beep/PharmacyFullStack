
const {Medicines , MedicineSold , MedCount , PostMedicine , DeleteMedicine , MarkMedicinePost , MarkMedicineGet , orderMedicine , PharmacistMedicine} = require('../controllers/medicines/medicineController')
const authenticateToken = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router(); 

router.get('/',authenticateToken, Medicines);
router.put('/:id',authenticateToken, MedicineSold);
router.get('/medcount',authenticateToken ,MedCount);
router.post('/post' , authenticateToken ,PostMedicine );
router.delete('/:id',authenticateToken , DeleteMedicine);
router.get('/mark',authenticateToken, MarkMedicineGet);
router.post('/mark',authenticateToken, MarkMedicinePost);
router.post('/orderMedicine', authenticateToken , orderMedicine)
router.get('/supplier/:id', authenticateToken,PharmacistMedicine)
module.exports = router; 