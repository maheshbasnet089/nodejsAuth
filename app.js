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
  res.redirect("/login");
});

// login User
app.get("/login", (req, res) => {
  res.render("login");
});

// LOGIN user post API
app.post("/login", async (req, res) => {
  // email , password
  const email = req.body.email;
  const password = req.body.password;

  //aako email registered xa ki xainw check garnu paryo
  const userFound = await users.findAll({
    where: {
      email: email,
    },
  });

  // if registered xainw vaney(no)
  if (userFound.length == 0) {
    // error faldinu paryo invalid email or email not registered error
    res.send("Invalid email or password");
  } else {
    const databasePassword = userFound[0].password; // database pahila register garda ko password
    //if registered xa vaney (yes)

    // if yes(xa) vaney ,password check garnu paryo
    const isPasswordCorrect = bcrypt.compareSync(password, databasePassword);
    

    // match vayena (no) , error->invalid password
    if(isPasswordCorrect){
      res.send("Login Sucessfull")
    }else{
      res.send("Invalid email or password")
    }
  }

  // match vayo(yes),login sucessfully
});

// listening the server
app.listen(3000, () => {
  console.log("Server has started at port 3000");
});
