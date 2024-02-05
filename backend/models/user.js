const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  num: Number,
  name: String,
  surname: String,
  phoneNumber: Number,
  address: String,
  postcode: Number,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  education: String,
  country: String,
  region: String,
  experience: String,
  additionalDetails: String
})

module.exports = mongoose.model('User', userSchema)