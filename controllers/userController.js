const mongoose = require('mongoose')

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' })
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.checkBody('name', 'You must supply a name!').notEmpty()
  req.checkBody('email', 'That email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password cannot be blank!').notEmpty()
  req.checkBody('confirmPassword', 'Confirm your password, please...').notEmpty()
  req.checkBody('confirmPassword', 'Your password do not match').equals(req.body.password)

  const errors = req.validationErrors()

  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    })
    return
  }
  next()
}
