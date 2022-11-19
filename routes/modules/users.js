const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const passport = require('passport')
const User = db.User
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true,
  badRequestMessage: 'Email or password incorrect!'
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have been successfully logged out.')
  return res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required!' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: 'Please make sure your passwords match.' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ where: { email }})
  .then(user => {
    if (user) {
      errors.push({ message: 'This email is already registered.' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
      name,
      email,
      password: hash
    }))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
  })
})

module.exports = router 