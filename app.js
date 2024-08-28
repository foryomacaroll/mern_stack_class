// start from ep14  Express js
// ============================
const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");



app.use((req,res,next)=>{ // Middleware Concept
  console.log("middleweare is running")
  next()
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

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
