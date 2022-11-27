const DEFAULT_PORT = 3000
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const app = express()

app.use(helmet())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/noteapp')
    .then(() => {
        console.log('Succesfully connected to the database!')
    })
    .catch(() => {
        console.log("Error while connecting to the database!")
    })

const notesRoute = require('./routes/notes')
const notebooksRoute = require('./routes/notebooks')

app.use('/notes', notesRoute)
app.use('/notebooks', notebooksRoute)
// Allows for using req.body.{name} in router
app.use(express.urlencoded({ extended: false }))

app.listen(process.env.PORT || DEFAULT_PORT, function () {
    console.log('Listening on port %d', (process.env.PORT || DEFAULT_PORT))
})
