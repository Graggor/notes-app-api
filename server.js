const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

app.use(helmet())

mongoose.connect('mongodb://127.0.0.1:27017/noteapp')
    .then(() => {
        console.log('Succesfully connected to the database!')
    })
    .catch(() => {
        console.log("Error while connecting to the database!")
    })

const notesRoute = require('./routes/notes')
const notebooksRoute = require('./routes/notebooks')
const usersRoute = require('./routes/users')

// Allows for using application/json in requests
app.use(express.json())
// Allows for using req.body.{name} in router
app.use(express.urlencoded({ extended: true }))

app.use('/notes', notesRoute)
app.use('/notebooks', notebooksRoute)
app.use('/auth', usersRoute)

app.listen(process.env.PORT, function () {
    console.log('Listening on port %d', (process.env.PORT))
})
