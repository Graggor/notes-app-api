const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const swagger = require('./swagger')
const app = express()

require('dotenv').config()

app.use(helmet())

mongoose
    .connect('mongodb://127.0.0.1:27017/noteapp')
    .then(() => {
        console.log('Succesfully connected to the database!')
    })
    .catch(() => {
        console.log('Error while connecting to the database!')
    })

const notesRoute = require('./routes/notes')
const notebooksRoute = require('./routes/notebooks')
const usersRoute = require('./routes/users')

// Allows for using application/json in requests
app.use(express.json())
// Allows for using req.body.{name} in router
app.use(express.urlencoded({ extended: true }))

// Add the Swagger documentation routes to the app object
swagger(app)

// Call the auth routes before using the verifyJWT middleware.
app.use('/auth', usersRoute)

// Middleware function to verify the JWT
function verifyJWT(req, res, next) {
    // Get token from request Authorization header
    var token = req.header('Authorization')

    // If there is no token, return an error.
    if (!token) {
        return res.status(401).json({ error: 'No token provided.' })
    }

    // Convention is to use "Bearer TOKENHERE", we only want the token, so we split it and select the second word, which should be the token if the request is ok.
    token = token.split(" ")[1]

    // There is a token, verify it.
    jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
        // Invalid token, return an error.
        if (err) {
            return res.status(401).json({ error: 'Invalid token' })
        }

        // Token verified, put it in the decoded object
        req.decoded = decoded
        // Call next so we can continue to the normal request.
        next()
    })
}

// Calling verifyJWT here, since it needs to be called for everything except auth routes.
app.use(verifyJWT)

app.use('/notes', notesRoute)
app.use('/notebooks', notebooksRoute)

app.listen(process.env.PORT, function () {
    console.log('Listening on port %d', process.env.PORT)
})
