const buyRouter = require('express').Router()

buyRouter.post('/', async (request, response) => {
    let header = "Rellena los datos."
    let text = "Error 400 - Bad Request"
    let flag = "SUGUS{Pr0T3g3_L0s_3nDP0InTs}"

    const { name, email, price } = request.body

    if(!name || !email || !price) {
        response.status(400).send({ text: text, header: header })
    }

    if (price < 0) {
        response.status(200).send({ header: "¡FELICIDADES! Has resuelto el reto, hacker :)", text: flag})
    }

    
})

module.exports = buyRouter