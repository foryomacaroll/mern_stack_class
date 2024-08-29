// start from ep14  Express js
// ============================
let morgan = require('morgan')
const express = require("express");
const mongoose = require('mongoose');
const Blog = require('./models/Blogs')
const app = express();

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

// Morgan Package
// ===============
app.use(morgan('dev'))
app.use(express.static('public')) 
// to connect 'public' folder // link:port/public

app.get('/add-blog', async (req,res)=>{
  let blog = new Blog({
    title: "blog title 2",
    intro: "blog intro 2",
    body: "blog body 2"
  });

  await blog.save();
  res.send('blog saved')

})

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World</h1>");

  let blogs = [
    { title: "Blog title 1 update", intro: "this is blog intro 1" },
    { title: "Blog title 2", intro: "this is blog intro 2" },
    { title: "Blog title 3", intro: "this is blog intro 3" },
  ];

  res.render("home", {
    name: "mgmg",
    age: 22,
    // blogs: blogs
    blogs, // ***** short-hand (render the array)
    title: "Home"
  });
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


