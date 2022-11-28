const express = require('express');
const Note = require('../models/note')
const router = express.Router()

const noteController = require('../controllers/noteController')

// Adding all the endpoints needed and forwarding the handling of it to the notesController
// Get single note by ID
router.get('/:id', noteController.getNote)
// Create new note, expects notebook ID in request
router.post('/', noteController.postNote)
// Delete note by ID
router.delete('/:id', noteController.deleteNote)
// Updates note by ID
router.patch('/', noteController.updateNote)

module.exports = router