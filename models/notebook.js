const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotebookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Export model
module.exports = mongoose.model('Notebook', NotebookSchema)
