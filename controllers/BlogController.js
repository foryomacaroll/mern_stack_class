const Blog = require('../models/Blogs')

const BlogController = {
    index: async (req, res) => {
        let blogs = await Blog.find().sort({createdAt: -1})
        console.log(blogs)
      
        res.render("home", {
          name: "mgmg",
          age: 22,
          blogs, // ***** short-hand (render the array)
          title: "Home"
        });
      },
      store: async (req, res) => {
        let {title,intro,body} = req.body
        let blog = new Blog({
          title,
          intro,
          body
        });
      
        await blog.save();
      
        res.redirect('/')
      },
      create: (req, res) => {
        res.render("blogs/create",{
          title: "Blog Create"
        });
      },
      destroy: async (req,res,next)=>{ // ep33 delete post
        try{
          let id = req.params.id
          await Blog.findByIdAndDelete(id)
          res.redirect('/')
        } catch(e){
          console.log(e)
          next()
        }
      },
      show: async (req,res,next)=>{
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
      }


}

module.exports = BlogController