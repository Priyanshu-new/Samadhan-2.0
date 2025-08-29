const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://127.0.0.1/studentdb')
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const studentRouter = require('./routes/students')
app.use('/students', studentRouter)

app.listen(3000, () => console.log('Server Started'))
