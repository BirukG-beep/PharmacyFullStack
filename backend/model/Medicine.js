// models/Medicine.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    medicineId: { type: String, required: true, unique: true },
    unit: { type: String, required: true },
    quantity: { type: Number, required: true },
    soldIn: { type: String },
    medicineGroup: { type: String },
    tabletsPerStrip: { type: Number },
    stripPerPk: { type: Number, default: 1 },
    singleSize: { type: Number, default: 1 },
    expirationDate: {
      type: Date,
      required: true,
    },
    price: { type: Number, default: 300 },
    medicineDescription: { type: String },
    supplierId: { type: String },
    batchNumber: { type: String },
  },
  {
    timestamps: true, // ✅ THIS LINE
  }
);
const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
