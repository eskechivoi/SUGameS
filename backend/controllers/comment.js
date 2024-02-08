const commentRouter = require('express').Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const Comment = require('../models/comment')

// MAL / VULNERABLE - Nunca poner el nombre del archivo original en la ruta.
// MAL / VULNERABLE - No comprobamos que el nombre del archivo sea de un determinado tipo.
const storage = multer.diskStorage({
    destination: function (_, _, cb) {
        cb(null, 'uploads/')
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });


commentRouter.get('/:game', async (request, response) => {
    const game = request.params.game;
    const comments = await Comment.find({"game": game}, { projection: { _id: 0 }}).catch(() => {
        return response.status(500).json({ error: 'Server error'})
    })
    response.status(200).send(comments)
})

commentRouter.post('/:game', upload.single('image'), async (request, response) => {
    const comment = request.body;
    console.log(comment)

    const commentBD = new Comment(comment)

    // Comentario guardado correctamente
    commentBD.save().then(() => {
        return response.status(200).send();
    }).catch((error) => {
        if (error.code === 11000) 
            return response.status(401).send();
        else 
            return response.status(500).send();
    })
})

module.exports = commentRouter;