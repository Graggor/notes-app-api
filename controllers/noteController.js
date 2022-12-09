const Note = require('../models/note')
var noteController = {}

/**
 * @swagger
 *
 * /notes:
 *   get:
 *     description: Returns a list of notes for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of notes.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Note'
 *       401:
 *         description: No token provided or invalid token.
 *       500:
 *         description: An error occurred.
 */
noteController.getNotesByUserID = async function (req, res) {
    try {
        // If we got here we should have the userID in the req.decoded.id
        const userID = req.decoded.id

        // Query the database for all notes with the given userID
        const notes = await Note.find({ owner: userID }).select('-__v')

        // Send the notes with a 200 status code
        res.status(200)
        res.json(notes)
    } catch (err) {
        // If there is an error, return a 500 status code. To be expanded with other status codes.
        res.status(500)
        res.json({ error: err.message })
    }
}

/**
 * @swagger
 *
 * /notes/{id}:
 *   get:
 *     description: Returns the specified note.
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The ID of the note to retrieve.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The specified note.
 *         schema:
 *           $ref: '#/definitions/Note'
 *       401:
 *          description: No token provided or invalid token.
 *       403:
 *          description: Not authorized to access the note.
 *       404:
 *         description: The note does not exist.
 *       500:
 *         description: An error occurred.
 */
noteController.getNote = async function (req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id })
        res.status(200)
        res.json(note)
    } catch {
        res.status(404)
        res.json({ error: "Note doesn't exist!" })
    }
}

// Creates new note
// Expects note to be the body
// Expects a user id in the req.decoded.id
// TODO: Figure out what a request should look like
/**
 * @swagger
 *
 * /notes:
 *   post:
 *     description: Creates a new note.
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: The title of the new note.
 *         in: body
 *         required: true
 *         type: string
 *       - name: content
 *         description: The content of the new note.
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The new note.
 *         schema:
 *           $ref: '#/definitions/Note'
 *       401:
 *          description: No token provided or invalid token.
 *       403:
 *          description: Not authorized to access the note.
 *       409:
 *         description: A note with the same title already exists.
 *       500:
 *         description: An error occurred.
 */
noteController.postNote = async function (req, res) {
    // notebook, owner, title, content
    const note = new Note({
        owner: req.decoded.id,
        notebook: '6390fa64b38b1d28e06bb43f',
        title: req.body.title,
        content: req.body.content,
    })

    try {
        await note.save()
        res.status(200)
        res.send(note)
    } catch (err) {
        // There was an error. Check if it's a duplicate.
        if (err.name === 'ValidationError') {
            res.status(409)
            res.json({ error: err.message })
        } else {
            // Not a duplicate, not sure what happened. Default error code.
            res.status(500)
            res.json({ error: err.message })
        }
    }
}

/**
 * @swagger
 *
 * /notes/{id}:
 *   delete:
 *     description: Deletes the specified note.
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The ID of the note to delete.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: The note was deleted successfully.
 *       401:
 *          description: No token provided or invalid token.
 *       403:
 *          description: Not authorized to access the note.
 *       404:
 *         description: The note does not exist.
 *       500:
 *         description: An error occurred.
 */
noteController.deleteNote = async function (req, res) {
    //TODO: add check to see if note belongs to user. Should return 403 if not.
    try {
        await Note.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.json({ error: "Post doesn't exist!" })
    }
}

/**
 * @swagger
 *
 * /notes/{id}:
 *   patch:
 *     description: Updates the specified note.
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The ID of the note to update.
 *         in: path
 *         required: true
 *         type: string
 *       - name: notebook
 *         description: The new notebook for the note.
 *         in: body
 *         required: false
 *         type: string
 *       - name: title
 *         description: The new title for the note.
 *         in: body
 *         required: false
 *         type: string
 *       - name: content
 *         description: The new content for the note.
 *         in: body
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: The updated note.
 *         schema:
 *           $ref: '#/definitions/Note'
 *       403:
 *          description: Not authorized to access the note.
 *       404:
 *         description: The note does not exist.
 *       500:
 *         description: An error occurred.
 */
noteController.updateNote = async function (req, res) {
    try {
        const note = await Note.findOne({ _id: req.params.id })
        console.log(note)

        if (req.body.notebook) {
            note.notebook = req.body.notebook
        }

        if (req.body.title) {
            note.title = req.body.title
        }

        if (req.body.content) {
            note.content = req.body.content
        }

        await note.save()
        res.status(200)
        res.json(note)
    } catch (err) {
        console.log(err)
        res.status(404)
        res.json({ error: "Note doesn't exist!" })
    }
}

module.exports = noteController
