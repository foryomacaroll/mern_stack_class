const http = require("http");
const fs = require("fs");
const _ = require("lodash");

console.log(_.random(20));

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  let filename;
  switch (req.url) {
    case "/":
      console.log("Home page is requesting");
      filename = "home.html";
      res.statusCode = 200;
      break;
    case "/contact":
      filename = "contact.html";
      res.statusCode = 200;
      break;
    case "/contact-us":
      res.setHeader("Location", "/contact");
      res.statusCode = 301;
      break;
    case "/about":
      filename = "about.html";
      res.statusCode = 200;
      break;
    default:
      filename = "404.html";
      res.statusCode = 404;
      break;
  }

  res.setHeader("Content-Type", "text/html");
  // inspect/ network/ all/ localhost/ header/ response header/ content-type
  fs.readFile("./views/" + filename, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server listening on port 3000");
});
