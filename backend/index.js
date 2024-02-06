require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const buyRouter = require('./controllers/buy')
const commentRouter = require('./controllers/comment')
const path = require('path')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	.then(() => {
	console.log('connected to MongoDB')
	})
	.catch((error) => {
	console.log('error connecting to MongoDB:', error.message)
	})

app.use(express.json())
app.use(cors())
app.use('/api/buy', buyRouter)
app.use('/api/comment', commentRouter)

// Sirve los archivos estáticos de la carpeta dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

function redirectFront (req, res) {
	res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'), function(err) {
		if (err) {
		  res.status(500).send(err)
		}
	  })
}

// Redirige las rutas del front al index.html
app.get('/', function(req, res) {
	redirectFront(req,res)
})

// Redirige las rutas del front al index.html
app.get('/cart', function(req, res) {
	redirectFront(req,res)
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`App listening on port ${PORT}`)
