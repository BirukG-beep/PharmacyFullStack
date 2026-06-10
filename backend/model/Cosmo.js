// models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  expireDate: { type: Date, required: true },
  price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Cosmo', ItemSchema);
