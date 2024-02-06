const commentRouter = require('express').Router()

commentRouter.get('/:game', async (request, response) => {
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

module.exports = commentRouter;