const express = require('express');
const noteController = require('../controllers/noteController')
const router = express.Router()

// Adding all the endpoints needed and forwarding the handling of it to the notesController
// Get all notes from user, expects user in request
router.get('/', noteController.getNotesByUserID)
// Get single note by ID
router.get('/:id', noteController.getNote)
// Create new note, expects notebook ID in request
router.post('/', noteController.postNote)
// Delete note by ID
router.delete('/:id', noteController.deleteNote)
// Updates note by ID
router.patch('/', noteController.updateNote)

module.exports = router