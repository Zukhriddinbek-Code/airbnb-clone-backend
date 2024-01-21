const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

const User = require("./models/User");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "afaerehrkhkhr2hekhwkrhekhrkh3k2h";
MONGOBD_URL =
  "mongodb+srv://zuhriddin-tech:gGujMjlS3jhRPdmz@cluster0.wzap21l.mongodb.net/airbnb?retryWrites=true&w=majority";

app.use(express.json());
app.use(cookieParser());

//connection between front and backend middlepoints
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(MONGOBD_URL);

app.get("/test", (req, res, next) => {
  res.json("test ok!");
});

//endpoint for register page sign up
app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

//endpoint for login page sign in
app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email: email });
  if (userDoc) {
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("password check fail 404!");
    }
  } else {
    res.json("User not found!");
  }
});

//endpoint for
app.get("/profile", async (req, res, next) => {
  const { token } = req.cookies;
  res.json({ token });
});

app.listen(3000);
