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
app.get("/contact", (req, res) => {
  res.sendFile("./views/contact.html", { root: __dirname });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
