const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     parameters:
 *       - in: formData
 *         name: username
 *         required: true
 *         type: string
 *         description: The username for the new user
 *       - in: formData
 *         name: password
 *         required: true
 *         type: string
 *         description: The password for the new user
 *     responses:
 *       201:
 *         description: Successfully registered the user and generated a JWT token
 *         examples:
 *           application/json:
 *             {
 *               "message": "User successfully registered",
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *             }
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A success message
 *             token:
 *               type: string
 *               description: The JWT token for the newly registered user
 *       409:
 *         description: The username is already taken
 *       500:
 *         description: An error occurred while registering the user
 */

router.post('/register', userController.signup)
router.post('/login', userController.signin)

module.exports = router