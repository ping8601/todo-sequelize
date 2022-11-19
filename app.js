const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const session = require('express-session')

const routes = require('./routes') 
const { route } = require('./routes')
const db = require('./models')
const Todo = db.Todo
const User = db.User

const app = express()
const PORT = 3000

// set view engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// parse all the body as string
app.use(express.urlencoded({ extended: true }))

// use method override to process all the request
app.use(methodOverride('_method'))

// user session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// set router
app.use(routes)

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})