const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const userController = require('./controllers/userController.js')

mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection
db.once('open', () => {
  console.log('Connected to mongodb!')
})

const app = express()

app.use(express.static('public'))
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

app.listen(3000, (err) => {
  if (err) throw err
  console.log('🏃‍♂️ -> http://localhost:3000/')
})
