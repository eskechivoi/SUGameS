const commentRouter = require('express').Router()
const Comment = require('../models/comment')

commentRouter.get('/:game', async (request, response) => {
    const { game } = request.body
    const comments = await Comment.find({"game": game}, { projection: { _id: 0 }}).catch(() => {
        return response.status(500).json({ error: 'Server error'})
    })

    response.status(200).send(comments)
})

commentRouter.post('/:game', async (request, response) => {
    
})

module.exports = commentRouter;