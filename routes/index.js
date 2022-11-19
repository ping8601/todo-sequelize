const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const home = require('./modules/home')
const auth = require('./modules/auth')
const todos = require('./modules/todos')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)

module.exports = router