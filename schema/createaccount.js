const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    panCardNumber:String,
    accountNumber: Number,
    firstName: String,
    lastName: String,
    mobileNumber: String,
    age: String,
    gender: String,
    pancard: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    account: String,
    bankAccount: String

});

module.exports = mongoose.model('Account-Details', userSchema);