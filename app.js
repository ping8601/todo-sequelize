const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

// set view engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// parse all the body as string
app.use(express.urlencoded({ extended: true }))

// use method override to process all the request
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})