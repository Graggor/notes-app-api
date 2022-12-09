const mongoose = require('mongoose')
var slug = require('mongoose-slug-updater')
const Schema = mongoose.Schema

const NotebookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        uniqueGroupSlug: ['owner'],
        slugPaddingSize: 1,
        slug: 'name',
        index: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

mongoose.plugin(slug)

// Export model
module.exports = mongoose.model('Notebook', NotebookSchema)
