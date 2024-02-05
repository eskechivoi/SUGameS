const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
const User = require('../models/user')

registerRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).end(JSON.stringify({
        error: 'You must submit an email and a password.'
    }))
  }

  const anotherUsr = await User.findOne({ email })
  if (anotherUsr)
    return response.status(401).json({error: 'There is another user with the same email.'})

  const passwordHash = bcrypt.hashSync(password, 10)
  
  const topIdUsr = await User.find().sort({num: -1}).limit(1).exec();
  const num = topIdUsr[0] ? topIdUsr[0].num + 1 : 1
  console.log(num)

  const user = new User({
    num: num,
    email: email,
    password: passwordHash,
    name: '',
    surname: '',
    phoneNumber: 0,
    address: '',
    postcode: 0,
    education: '',
    country: '',
    region: '',
    experience: '',
    additionalDetails: ''
  }) 

  user.save().then(() => {
    return response.status(200).send()
  }).catch(error => {
    if (error.code === 11000) {
        return response.status(401).send()
    } else {
        return response.status(500).send()
    }
  })
})

module.exports = registerRouter