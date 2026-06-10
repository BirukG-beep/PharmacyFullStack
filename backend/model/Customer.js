const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    medicineName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price: {
        type: Number,
        default: 0
    },
    total:{
        type: Number,
        default:0
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:String,
    adress:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    purchase: [purchaseSchema]
})
module.exports = mongoose.model('Customer', customerSchema);