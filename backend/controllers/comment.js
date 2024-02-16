const commentRouter = require('express').Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const Comment = require('../models/comment')

// MAL / VULNERABLE - Nunca poner el nombre del archivo original en la ruta.
const storage = multer.diskStorage({
    destination: function (_, _, cb) {
        cb(null, 'uploads/')
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname)
    }
})

// VULNERABLE : mimetype solo comprueba el tipo definido en las cabeceras del archivo, no comprueba el tipo real
const upload = multer({ 
    storage: storage,
    fileFilter: function (_, file, cb) {
        // Comprueba si el archivo es una imagen
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // Acepta el archivo
            cb(null, true);
        } else {
            // Rechaza el archivo
            cb(new multer.MulterError('Solo se permiten archivos de imagen (jpeg o png)'), false);
        }
    }
});


commentRouter.get('/:game', async (request, response) => {
    const game = request.params.game;
    const comments = await Comment.find({"game": game}, { projection: { _id: 0 }}).catch(() => {
        return response.status(500).json({ error: 'Server error'})
    })
    response.status(200).send(comments)
})

commentRouter.post('/:game', upload.single('image'), async (request, response) => {
    const comment = request.body;
    const filename = request.file.originalname;
    comment.image = filename;

    var extension = path.extname(filename);

    const commentBD = new Comment(comment)

    // Comentario guardado correctamente
    commentBD.save().then(() => {
        if (extension !== ".png" && extension !== ".jpeg") {
            return response.status(200).send("SUGUS{R3V7s4_l4s_3xT3NsI0N3s}");
        } else {
            return response.status(200).send();
        }
    }).catch((error) => {
        if (error.code === 11000) 
            return response.status(401).send();
        else 
            return next(error); // Pasamos el error al middleware de error
    })
}, (error, req, response, next) => { // Middleware de error personalizado
    if (error instanceof multer.MulterError) {
        return response.status(403).send({message: `Error al guardar archivos. Solo se permiten archivos de imagen (jpeg o png) `});
    } else if (error) {
        return response.status(500).send({message: `Error del servidor`});
    }
});

module.exports = commentRouter;