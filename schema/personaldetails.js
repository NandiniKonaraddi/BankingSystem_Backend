const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    aboutMe: String
  });

module.exports = mongoose.model('Personal-Details', userSchema);