const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: Number,
    comments: {
        type: Array
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        username: String,
        name: String,
        ref: 'User'
    },
    id: String
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
const Blog = mongoose.model('Blog', blogSchema)


module.exports = Blog

