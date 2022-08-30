const { Schema, model } = require('mongoose')

const blogPostSchema = new Schema({
    image:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    tags:{
        type: Array,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const blogPost = new model('blogPost', blogPostSchema)

module.exports = blogPost;