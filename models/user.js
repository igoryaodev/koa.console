const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  phoneNumber: String,
  name: String,
  age: String,
})

module.exports = mongoose.model('User', UserSchema)