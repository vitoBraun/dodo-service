const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { userTypes } = require('../util/constants')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: userTypes
  },
  passwordHash: { type: String, required: true },
  groups: { type: [String] },
  catalogUrl: { type: String },
  remainingOrders: { type: Number, default: 5 }
})

userSchema.methods.isPasswordValid = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.passwordHash, (err, res) => {
      if (err) reject(err)
      if (res === true) {
        resolve()
      } else {
        reject(new Error('Password is incorrect'))
      }
    })
  })
}

module.exports = mongoose.model('User', userSchema)
