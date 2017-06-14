const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')
require('dotenv').config({path: 'variables.env'})

const userController = require('./controllers/userController.js')

mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to mongodb!')
})

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(expressValidator())
app.use(flash())
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use((req, res, next) => {
  res.locals.flashes = req.flash()
  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  const user = {
    username: 'riza'
  }
  const courses = [
    { id: 1, title: 'Introduction to ExpressJS' },
    { id: 2, title: 'Database with NodeJS and ExpressJS' }
  ]

  return res.render('index', {
    user: user,
    title: 'Welcome to Express Course',
    courses: courses
  })
})

app.get('/register', userController.registerForm)
app.post('/register', userController.validateRegister)

app.listen(3000, (err) => {
  if (err) throw err
  console.log('🏃‍♂️ -> http://localhost:3000/')
})
