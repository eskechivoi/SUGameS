const buyRouter = require('express').Router()

buyRouter.post('/', async (request, response) => {
    let header = "Rellena los datos."
    let text = "Error 400 - Bad Request"
    let flag = "SUGUS{Pr0T3g3_L0s_3nDP0InTs}"

    const { name, email, price } = request.body
    console.log(request.body)

    if(!name || !email || !price) {
        response.status(400).json({ message: text, header: header, button : "Volver a la tienda"})
    } else if (price < 0) {
        response.status(200).send({ header: "¡FELICIDADES! Has resuelto el reto, hacker :)", text: flag, button : "Volver a la tienda"})
    } else {
        response.status(200).send({ 
            header: "Tu pedido se ha confirmado, " + name, 
            text: "Te llegará un correo de confirmación a " + email + " cuando se envíe el paquete", 
            button : "Volver a la tienda"
        })
    }

})

module.exports = buyRouter