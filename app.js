const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.send('Hello Express 🖖')
})

app.listen(3000, (err) => {
  if (err) throw err
  console.log('🏃‍♂️ -> http://localhost:3000/')
})
