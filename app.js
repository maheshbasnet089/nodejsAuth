const express = require("express");
const { users } = require("./model/");
const bcrypt = require("bcryptjs");
const app = express();
// requiring database file
require("./model/");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// nodejs lai ejs use gar vaneko here
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("You are in home page");
});
// register form

app.get("/register", (req, res) => {
  res.render("register");
});

// POST API (register)
app.post("/createUser", async (req, res) => {
  await users.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  // finally create vayepaxi
  res.send("User registered sucessfully");
});

// listening the server
app.listen(3000, () => {
  console.log("Server has started at port 3000");
});
