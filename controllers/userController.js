const mongoose = require('mongoose')

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' })
}
