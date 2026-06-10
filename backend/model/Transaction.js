// models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  medicineId: String,
  medicineName: String,
  quantity:Number,
  price:Number,
  date: Date,
  Method:String,
  saler:String
});

module.exports = mongoose.model('Transaction', transactionSchema);
