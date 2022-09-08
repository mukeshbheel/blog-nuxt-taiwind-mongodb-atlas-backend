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
    likes:{
        type: Number,
        default: 0,
    },
    comments:{
        type: Array,
        default: [],
    },
    date:{
        type: Object,
        default: {
            date: Date.now,
            day: new Date().getDay(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        }
    }
});

const blogPost = new model('blogPost', blogPostSchema)

module.exports = blogPost;