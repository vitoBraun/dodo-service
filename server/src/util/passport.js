const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BasicStrategy = require('passport-http').BasicStrategy
const User = require('../models/users-model')

passport.use(
  new LocalStrategy((email, password, done) => {
    let user = null
    User.findOne({ email: email.toLowerCase() })
      .exec()
      .then(result => {
        user = result
        return user.isPasswordValid(password, user.passwordHash)
      })
      .then(() => {
        done(null, user)
      })
      .catch(err => {
        done(null, false, { message: err.message })
      })
  })
)

passport.use(
  new BasicStrategy((email, password, done) => {
    let user = null
    User.findOne({ email: email.toLowerCase() })
      .exec()
      .then(result => {
        user = result
        return user.isPasswordValid(password, user.passwordHash)
      })
      .then(() => {
        if (user.type === 'admin' || user.type === 'service') {
          done(null, user)
        } else {
          done(null, false, { message: 'User does not have permission' })
        }
      })
      .catch(err => {
        done(null, false, { message: err.message })
      })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user._id.toHexString())
})

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .exec()
    .then(user => {
      done(null, user)
    })
})

module.exports = passport
