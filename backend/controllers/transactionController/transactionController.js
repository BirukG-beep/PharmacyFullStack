
const Transaction = require('../../model/Transaction');
const TotalSales = require("../../model/SchemaTotalSale");
const Medicine = require("../../model/Medicine");
const {calculatePrice} = require("../../helper/calculatePrice");
const {quantityConvertor} = require("../../helper/quantityConvertor");
const Customer = require('../../model/Customer');
module.exports.Transaction = async (req, res) => {
  try {
    // Remove _id from req.body if it exists
    const newTransactionData = { ...req.body };
    delete newTransactionData._id; // Prevent MongoDB from trying to use an existing _id

    const newTransaction = new Transaction(newTransactionData);
    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports.PostTransaction =  async (req, res) => {
   console.log(req.body)
  try {
    let savedTransaction;
    const {medicineSold , date , Method , saler} = req.body;
     if (medicineSold && Array.isArray(medicineSold)){
    for (const item of medicineSold) {
    try {
      // Await the database query
      const medicine = await Medicine.findOne({ medicineId: item.medicineId }).exec();
      
      if (!medicine) {
        console.error(`Medicine not found for ID: ${item.medicineId}`);
        continue;
      }

      // Calculate values
      const quantityFinal = quantityConvertor(item.quantity, medicine, item.soldIn);
      const price = calculatePrice(medicine, item.soldIn);

      // Validate calculations
      if (isNaN(price) || isNaN(quantityFinal)) {
        throw new Error(`Invalid calculation for medicine ${item.medicineId}`);
      }

      const transaction ={
          medicineId : item.medicineId,
          medicineName: item.medicineName,
          price: price,
          quantity: quantityFinal,
          data: date ,
          Method: Method,
          saler: saler
        }

        console.log("weeoe")
        const newTransaction = new Transaction(transaction);
         savedTransaction = await newTransaction.save();
        
         console.log(date , price)
    } catch (err) {
      console.error(`Error processing item ${item.medicineId}:`, err);
      // Continue with next item or rethrow if you want to stop
    }
  }}

  else {
     try {
      console.log(req.body)
       const {_id , medicineName, medicineId, unit,  quantity, soldIn, medicineGroup, tabletsPerStrip,stripPerPk,singleSize,expirationDate,price,medicineDescription, batchNumber,date, Method,saler} = req.body;
      // Await the database query
      const medicine = await Medicine.findOne({ medicineId: medicineId }).exec();
      
      if (!medicine) {
        console.error(`Medicine not found for ID: ${medicineId}`);
      }

      // Calculate values
      const quantityFinal = quantityConvertor(quantity, medicine, soldIn);
      console.log(quantityFinal)
      // const price = calculatePrice(medicine, item.soldIn);

      // Validate calculations
      if (isNaN(price) || isNaN(quantityFinal)) {
        throw new Error(`Invalid calculation for medicine ${medicineId}`);
      }

      const transaction ={
          medicineId : medicineId,
          medicineName: medicineName,
          price: price,
          quantity: quantityFinal,
          date: date ,
          Method: Method,
          saler: saler
        }
        const customer = await Customer.findOne({ phone: req.body.to }).exec();
        if (!customer) {
          console.error(`Customer not found for phone: ${req.body.to}`);
        } else {
       const purchaseItem = {
    medicineName: medicineName,
    quantity: quantityFinal,
    price: price,
    total: price * quantityFinal,
    purchaseDate: date || new Date()
  };

  console.log("purchaseItem" , purchaseItem)

  customer.purchase.push(purchaseItem);

  await customer.save(); // 🔥 VERY IMPORTANT
        }
        console.log(quantityFinal)
        const newTransaction = new Transaction(transaction);
         savedTransaction = await newTransaction.save();

         const sales = new TotalSales({
          sentDate:date,
          totalSale:price
         });
    

        


         const results = await sales.save();
         console.log(results)
    } catch (err) {
      console.error(`Error processing item ${item.medicineId}:`, err);
      // Continue with next item or rethrow if you want to stop
    }
  }
    // const newTransactionData = { ...req.body };
    // delete newTransactionData._id; // Prevent MongoDB from trying to use an existing _id

  
    res.json(savedTransaction);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}
module.exports.TotalTransaction = async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  module.exports.IndMed =   async (req, res) => {
    const { medicineId } = req.query; // Get the medicineId from query parameters
  
    if (!medicineId) {
      return res.status(400).json({ error: 'Medicine ID is required' });
    }
  
    try {
      const transactions = await Transaction.find({ medicineId }).sort({ date: -1 });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  }