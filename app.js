const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes') 
const { route } = require('./routes')
const db = require('./models')
const Todo = db.Todo
const User = db.User
const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT

// set view engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// parse all the body as string
app.use(express.urlencoded({ extended: true }))

// use method override to process all the request
app.use(methodOverride('_method'))

// user session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// use passport
usePassport(app)

// use connect-flash
app.use(flash())

// add middleware to add variables for each request
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error')
  next()
})

// set router
app.use(routes)

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})