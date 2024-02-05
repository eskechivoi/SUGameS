const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const profileRouter = require('express').Router()
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

profileRouter.get('/:num', async (request, response) => {
    const token = getTokenFrom(request)
    if (!token) return response.status(401).json({ error: 'token invalid' })
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id).catch(() => {
        return response.status(500).json({ error: 'server error'})
    })

    if (user.num != request.params.num) // Esta comprobación es absurrda, es para el reto.
        return response.status(401).json({ error: 'token invalid' })
    
    delete user.password // No enviamos el hash de la contraseña a través de la red

    response
    .status(200)
    .send(user)
})

/*
THIS METHOD IS VULNERABLE, WE SHOULD NOT FIND A USER USING NUM, BUT USING ID
WE MUSTN'T ALOW UNAUTHORISED PEOPLE TO UPDATE
*/
profileRouter.put('/:num', async (request, response) => {
    const num = request.params.num

    const user = await User.findOne({ num }).catch(() => {
      return response.status(500).end()
    })
  
    const reqUser = request.body
    if (reqUser.password && reqUser.password.length < 8)
      return response.status(400).json({error: 'Password must be at least 8 characters long.'})
    else if (reqUser.password) {
      const passwordHash = bcrypt.hashSync(reqUser.password, 10)
      reqUser.password = passwordHash
    }

    await User.updateOne(
      { num: num }, // Consulta para filtrar los documentos a modificar
      { $set: reqUser } // Elementos que se modificarán
    ).catch(error => {
          return response.status(500).end(error)
    })
    response.status(200).send()
})

module.exports = profileRouter