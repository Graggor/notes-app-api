const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var userController = {}

/**
 * @swagger
 * /users/register:
 *   post:
 *     description: Registers a new user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: The username for the new user.
 *         in: formData
 *         required: true
 *         type: string
 *         example: john_doe
 *       - name: password
 *         description: The password for the new user.
 *         in: formData
 *         required: true
 *         type: string
 *         example: p@ssword
 *     responses:
 *       201:
 *         description: User created successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User john_doe registered successfully.
 *       409:
 *         description: A user with the given username already exists.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User already exists.
 *       500:
 *         description: An error occurred.
 */

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
                res.json({error: err.message})
            } else{
                // Not a duplicate, not sure what happened. Default error code.
                res.status(500)
                res.json({ error: err.message })
            }
        } else{
            // User created! Send an OK with the registered username.
            res.status(201)
            res.json({message: `User ${user.username} registered successfully.`})
        }
    })
}

/**
 * @swagger
 * /users/login:
 *   post:
 *     description: Logs in a user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: The username of the user to log in.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: The password of the user to log in.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 5e983e5f5c5b2d179c5e9f79
 *                 username:
 *                   type: string
 *                   example: john_doe
 *             message:
 *               type: string
 *               example: Login successfull
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZiw7ruYzOTBmYTYifjghtruykMjhlMDZiYjQzNyIsInVzZXJuYW1lIjoiR3JhZ2dvciIsImlhdCI6MTY3MDU0Nzk1OCwiZXhwIjoxasdfNjM0MzU4fQ.2bgxxHkiXkVzMTPkw4AKtscQFEYQ8keGUq8K82TnTsd
 *       401:
 *         description: Invalid password.
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: null
 *             message:
 *               type: string
 *               example: Invalid password!
 *       404:
 *         description: User not found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: User not found.
 *       500:
 *         description: An error occurred.
 */

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