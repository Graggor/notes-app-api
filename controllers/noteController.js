const Note = require('../models/note')
var noteController = {}

// if an ID is given, tries to find a note by that ID and passes it on in the req. Otherwise sends the error.
noteController.params = function(req, res, next, id){
    var id = req.params.id
    Note.findById(id)
        .exec()
        .then(function(note){
            req.note = note || {}
            next()
        })
        .catch(function(err){
            res.send(err)
        })
}

// Grabs the note from previous function and sends it with a status 200
noteController.getNote = function(req, res){
    var note = req.note
    res.status(200).json(note)
}

// Creates new note
// Expects note to be the body
// Expects a user with _id param ????
// TODO: Figure out what a request should look like
noteController.postNote = function(req, res){
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
noteController.deleteNote = function(req, res){
    //TODO: add check to see if note belongs to user.
    var noteToDelete = req.note
    Note.deleteOne({_id: noteToDelete._id})
        .exec()
        .catch(function (err){
            res.send(err)
        })
}

// Updates note
noteController.updateNote = function(req, res){

}

module.exports = noteController