const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    notebook: {
        type: Schema.Types.ObjectId,
        ref: 'Notebook',
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastEdit: {
        type: Date,
        default: Date.now,
    },
})

// Export model
module.exports = mongoose.model('Note', NoteSchema)
