const express = require('express')
const Blog = require('../models/Blogs')
const router = express.Router()

// Remove /blogs for refactoring ==> add in app.js ==> ('/blogs',blogRoutes)

router.get("", async (req, res) => {
    let blogs = await Blog.find().sort({createdAt: -1})
    console.log(blogs)
  
    res.render("home", {
      name: "mgmg",
      age: 22,
      blogs, // ***** short-hand (render the array)
      title: "Home"
    });
  });
  
  router.post("", async (req, res) => {
    let {title,intro,body} = req.body
    let blog = new Blog({
      title,
      intro,
      body
    });
  
    await blog.save();
  
    res.redirect('/')
  });
  
  
  router.get("/create", (req, res) => {
    res.render("blogs/create",{
      title: "Blog Create"
    });
  });
  
  router.get('/:id/delete', async (req,res,next)=>{ // ep33 delete post
    try{
      let id = req.params.id
      await Blog.findByIdAndDelete(id)
      res.redirect('/')
    } catch(e){
      console.log(e)
      next()
    }
  })
  
  router.get('/:id', async (req,res,next)=>{
    try{
      let id = req.params.id
      let blog = await Blog.findById(id);
      res.render("blogs/show", {
        blog,
        title: 'Blog Detail'
      });
      console.log(blog)
    } catch(e){
      console.log(e)
      next()
    }
  })

  module.exports = router