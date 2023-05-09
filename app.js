const { urlencoded } = require("express");
const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const app = express();
port = 8000;

const emaillogin = "ajumal@gmail.com";
const passwordlogin = "1234";
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);
app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});
app.get("/", (req, res) => {
  if (req.session.auth) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
  ``;
});
app.get("/home", (req, res) => {
  if (req.session.auth) {
    res.render("home");
  } else {
    res.redirect("/");
  }
});
app.get("/logout", (req, res) => {
  res.redirect("/");
  req.session.destroy();
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  if (email === emaillogin && passwordlogin == password) {
    req.session.auth = true;
    res.redirect("/home");
  } else {
    res.render("login");
  }
});
app.listen(port, console.log(`server running in port:${port}`));

