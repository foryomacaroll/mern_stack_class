// start from ep14  Express js
// ============================
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  //   res.send("<h1>Hello World</h1>");
  res.sendFile("./views/home.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});
app.get("/about-us", (req, res) => {
  // Redirect to /about page
  res.redirect("/about");
});
app.get("/contact", (req, res) => {
  res.sendFile("./views/contact.html", { root: __dirname });
});
app.use((req, res) => {
  // Fall-Back
  res.status(404);
  res.sendFile("./views/404.html", { root: __dirname });
});

// app.use must be write in end of route codes.
// Because, if a routes comes in, express js will search the route from up to down
// if the route match the method, it will not search for remaining codes.
/* *** if we write app.use between routes, the method routes under app.use will never
be found anymore. */

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
