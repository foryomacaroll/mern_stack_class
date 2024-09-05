// start from ep14  Express js
// ============================
let morgan = require('morgan')
const express = require("express");
const mongoose = require('mongoose');
const Blog = require('./models/Blogs')
var expressLayouts = require('express-ejs-layouts');
const blolgRoutes = require('./routes/blogRoutes')

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
  res.redirect('/blogs')
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

app.use('/blogs',blolgRoutes) // /blogs ==> refactoring

app.use((req, res) => {
  res.status(404).render("404",{
    title: "404 Not Found"
  });
});
// app.use must be write in end of route codes.
// Because, if a routes comes in, express js will search the route from up to down
// if the route match the method, it will not search for remaining codes.
/* *** if we write app.use between routes, the method routes under app.use will never
be found anymore. */


