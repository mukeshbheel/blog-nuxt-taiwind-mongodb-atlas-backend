const express = require('express')
const router = express.Router()
const blogPost = require('../../models/blogPost')

router.get('/', async(req, res)=>{
    try {
        const blogPosts = await blogPost.find();
        if(!blogPosts) throw new Error('couldnt find anything');

        const sorted = blogPosts.sort((a,b)=>{
            return new Date(a.date.date).getTime() - new Date(b.date.date).getTime()
        })

        res.status(200).json(sorted)

        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const singleBlogPost = await blogPost.find({_id:id});
        if(!singleBlogPost) throw new Error("couldn't find anything");
        res.status(200).json(singleBlogPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/category/:category', async(req, res) => {
    try {
        const {category} = req.params;
        const singleBlogPost = await blogPost.find({category:category});
        if(!singleBlogPost) throw new Error("couldn't find anything");
        res.status(200).json(singleBlogPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/search/:searchTerm', async(req, res) => {
    try {
        const {searchTerm} = req.params;
        const searchResults = await blogPost.find({tags:searchTerm})
        if(!searchResults) throw new Error("couldn't find anything")
        res.status(200).json(searchResults)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', async(req, res)=>{
    try {
        const newblogPost = await new blogPost(req.body).save();
        if(!newblogPost) throw new Error('error occurs');
        res.status(200).json(newblogPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/:id', async(req, res)=>{
    const { id } = req.params;
    try {
        const deletedBlogPost = await blogPost.findByIdAndDelete(id)
        if(!deletedBlogPost) throw Error('something went wrong')
        res.status(200).json(deletedBlogPost)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.put('/:id', async(req, res)=>{
    const {id} = req.params;
    try {
        const updatedBlogPost = await blogPost.findByIdAndUpdate(id, req.body)
        if(!updatedBlogPost) throw Error('something went wrong')
        res.status(200).json(updatedBlogPost) 
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
})

module.exports = router;