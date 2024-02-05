const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email }).catch(() => {
    return response.status(500).end()
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token: token, num: user.num })
})

module.exports = loginRouter