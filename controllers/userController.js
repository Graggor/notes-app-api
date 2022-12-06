const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var userController = {}


userController.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })

    user.save((err, user) => {
        if(err){
            // There was an error. Check if it's a duplicate.
            if (err.name === 'ValidationError'){
                res.status(409)
                res.send(err.message)
            } else{
                // Not a duplicate, not sure what happened. Default error code.
                res.status(500)
                res.send()
            }
        } else{
            // User created! Send an OK with the registered username.
            res.status(201)
            res.send({message: `User ${user.username} registered successfully.`})
        }
    })
}

userController.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: err,
            })
        }
        if (!user) {
            // User wasn't found.
            return res.status(404).send({
                message: 'User not found.',
            })
        }

        // No errors, user was found.
        // Comparing passwords
        var validPassword = bcrypt.compareSync(req.body.password, user.password)

        // Password not valid, sending response
        if(!validPassword){
            return res.status(401)
                .send({
                    accessToken: null,
                    message: "Invalid password!"
                })
        }

        // Password valid, generating token.
        var token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.API_SECRET, {
            expiresIn: 86400
        })
        
        res.status(200)
            .send({
                user: {
                    id: user._id,
                    username: user.username,
                },
                message: "Login successfull",
                accessToken: token,
            })
    })
}

module.exports = userController