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

// Want to add:
// title readability names like this-is-my-title
// Automatically add a number to the end if the title exists, like this-is-my-title1
// https://www.npmjs.com/package/mongoose-slug-updater for above, see uniqueGroupSlug

// Export model
module.exports = mongoose.model('Note', NoteSchema)
