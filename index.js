const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

const User = require("./models/User");

const bcryptSalt = bcrypt.genSaltSync(10);
MONGOBD_URL =
  "mongodb+srv://zuhriddin-tech:gGujMjlS3jhRPdmz@cluster0.wzap21l.mongodb.net/airbnb?retryWrites=true&w=majority";

app.use(express.json());

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

app.listen(3000);
