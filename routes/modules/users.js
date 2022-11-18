const express = require('express')
const db = require('../../models')
const User = db.User
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassowd } = req.body
  User.create({ name, email, password })
    .then(res.redirect('/'))
})

module.exports = router 