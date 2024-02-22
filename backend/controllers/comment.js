const commentRouter = require('express').Router()
const path = require('path')
const Comment = require('../models/comment')

commentRouter.get('/:game', async (request, response) => {
    const game = request.params.game;
    const comments = await Comment.find({"game": game}, { projection: { _id: 0 }}).catch(() => {
        return response.status(500).json({ error: 'Server error'})
    })
    response.status(200).send(comments)
})

commentRouter.post('/:game', async (request, response) => {
    if (request.body.text === '') {
        return response.status(400).send({message: `No se admiten comentarios vacíos`});
    }

    const comment = request.body;
    if (request.files.image){
        const file = request.files.image; 
        const filename = file.name;
        const type = file.mimetype; // EL TIPO MIME DEL ARCHIVO
        const destination = 'uploads/' + filename

        file.mv(destination, err => { // mover el archivo
            if (err) {
              return res.status(500).send("Error al guardar la imagen en el servidor (no es parte del reto, avisa al staff).");
            }
        })

        var extension = path.extname(filename);
        comment.image = filename;
        const commentBD = new Comment(comment)

        console.log(comment)
        console.log(`Extensión: ${extension}`)
        console.log(`Filename: ${filename}`)
        console.log(`MIME Type: ${type}`)

        // VULNERABLE, SOLO COMPROBAMOS EL TIPO MIME EN LUGAR DE LA FIRMA DEL ARCHIVO
        if (type === 'image/png' || type === 'image/jpeg'){
            // Comentario guardado correctamente
            commentBD.save().then(() => {
                if (extension !== ".png" && extension !== ".jpeg" && extension !== ".jpg") {
                    return response.status(200).send("SUGUS{R3V7s4_l4s_3xT3NsI0N3s}");
                } else {
                    return response.status(200).send({message: `Comentario publicado correctamente.`});
                }
            }).catch((error) => {
                if (error.code === 11000) 
                    return response.status(401).send({message: `Error al conectar con la base de datos (no es parte del reto, avisa al staff).`});
                else 
                    return next(error); // Pasamos el error al middleware de error
            })
        } else {
            return response.status(403).send({message: `Error al guardar archivos. Solo se permiten archivos de imagen (jpeg o png) `});
        }
    } else 
        return response.status(400).send({message: `Debe subir una captura de su juego.`});
}, (error, req, response, next) => { // Middleware de error personalizado
    if (error) {
        return response.status(500).send({message: `Error del servidor`});
    }
});

module.exports = commentRouter;