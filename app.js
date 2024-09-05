// start from ep14  Express js
// ============================
let morgan = require('morgan')
const express = require("express");
const mongoose = require('mongoose');
const Blog = require('./models/Blogs')
var expressLayouts = require('express-ejs-layouts');
const app = express();

app.use(express.urlencoded({extended: true}))

// db url
let mongoUrl = "mongodb+srv://foryomacaroll:test1234@cluster0.uhzcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl).then(()=>{
  console.log('CONNECTED TO DB')
  app.listen(3000, () => {
    console.log("app is running on port 3000");
  });
}).catch(e => {
  console.log(e)
})

app.set("views", "./views");
app.set("view engine", "ejs")
app.use(expressLayouts);
app.set('layout', 'layouts/default');

// Morgan Package
// ===============
app.use(morgan('dev'))
app.use(express.static('public')) 
// to connect 'public' folder // link:port/public

app.get('/add-blog', async (req,res)=>{
  let blog = new Blog({
    title: "blog title 3",
    intro: "blog intro 3",
    body: "blog body 3"
  });

  await blog.save();
  res.send('blog saved')

})

app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({createdAt: -1})
  console.log(blogs)

  res.render("home", {
    name: "mgmg",
    age: 22,
    blogs, // ***** short-hand (render the array)
    title: "Home"
  });
});

app.post("/blogs", async (req, res) => {
  let {title,intro,body} = req.body
  let blog = new Blog({
    title,
    intro,
    body
  });

  await blog.save();

  res.redirect('/')
});

app.get("/about", (req, res) => {
  res.render("about",{
    title: "About"
  });
});
app.use((req,res,next)=>{ // Middleware Concept
  console.log("second middleweare is running")
  next()
})
app.get("/contact", (req, res) => {
  res.render("contact",{
    title: "Contact"
  });
});
app.get("/blogs/create", (req, res) => {
  res.render("blogs/create",{
    title: "Blog Create"
  });
});

app.get('/blogs/:id/delete', async (req,res,next)=>{ // ep33 delete post
  try{
    let id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.redirect('/')
  } catch(e){
    console.log(e)
    next()
  }
})

app.get('/blogs/:id', async (req,res,next)=>{
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

app.use((req, res) => {
  // Fall-Back
  //   res.status(404);
  //   res.render("404");
  res.status(404).render("404",{
    title: "404 Not Found"
  });
});
// app.use must be write in end of route codes.
// Because, if a routes comes in, express js will search the route from up to down
// if the route match the method, it will not search for remaining codes.
/* *** if we write app.use between routes, the method routes under app.use will never
be found anymore. */


