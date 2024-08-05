const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accountNumber: Number,
    date: String,
    amount:Number,
    description:String,
    category:String,
    bankAccount: String,
    account:String,
    accountNumber:Number,
    transactionType:String
});

module.exports = mongoose.model('Transaction-History-Details', userSchema);