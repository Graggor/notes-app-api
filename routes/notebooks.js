const express = require('express')
const router = express.Router()

const notebookController = require('../controllers/notebookController')

// Adding all the endpoints needed and forwarding the handling of it to the controller
// Gets all notebooks from the user specified in request
router.get('/', notebookController.getNotebooks)
// Gets all notes that are in notebook with ID notebookId
router.get('/:id/notes', notebookController.getNotesInNotebook)
// Create new Notebook
router.post('/', notebookController.postNotebook)
// Updates Notebook, expects ID in request
router.patch('/', notebookController.updateNotebook)
// Deletes Notebook. WARNING: Deletes ALL notes in the notebook aswell!
router.delete('/:id', notebookController.deleteNotebook)

module.exports = router
