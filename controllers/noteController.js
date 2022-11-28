const Note = require('../models/note')
var noteController = {}

// Grabs the note from previous function and sends it with a status 200
noteController.getNote = async function(req, res){
    try {
        const note = await Note.findOne({_id: req.params.id})
        res.status(200)
        res.send(note)
    } catch {
        res.status(404)
        res.send({error: "Note doesn't exist!"})
    }
}

// Creates new note
// Expects note to be the body
// Expects a user with _id param ????
// TODO: Figure out what a request should look like
noteController.postNote = async function(req, res){
    // notebook, owner, title, content
    const note = new Note({
        notebook: req.body.notebook,
        owner: req.body.owner,
        title: req.body.title,
        content: req.body.content
    })
    await note.save()
    res.status(200)
    res.send(note)

    var note = req.body
    note.owner = req.user._id
    Note.create(note)
        .exec()
        .then(function(note){
            res.json(note)
        })
        .catch(function(err){
            res.send(err)
        })
}

// Deletes note
noteController.deleteNote = async function(req, res){
    //TODO: add check to see if note belongs to user.
    try {
        await Note.deleteOne({_id: req.params.id})
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({error: "Post doesn't exist!"})
    }
}

// Updates note
noteController.updateNote = async function(req, res){
    try {
        const note = await Note.findOne({ _id: req.params.id })

        if (req.body.notebook){
            note.notebook = req.body.notebook
        }

        if (req.body.title) {
            note.title = req.body.title
        }

        if (req.body.content) {
            note.content = req.body.content
        }

        // TODO: UPDATE lastEdit FIELD
        await note.save()
        res.status(200)
        res.send(note)
    } catch {
        res.status(404)
        res.send({error: "Note doesn't exist!"})
    }
}

module.exports = noteController