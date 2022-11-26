const express = require('express');

const router = express.Router()

// 

// GET /notes/id
// Gets note by note ID
router.get('/:id', (req, res) => {
    var returntext = 'note id ' + req.params.id
    res.status(200).send(returntext)
    res.json
})

module.exports = router;