const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

MONGOBD_URL =
  "mongodb+srv://zuhriddin-tech:gGujMjlS3jhRPdmz@cluster0.wzap21l.mongodb.net/register_users?retryWrites=true&w=majority";
const app = express();

// gGujMjlS3jhRPdmz

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
app.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;
  User.create({ name, email, password });
  res.json({ name, email, password });
});

app.listen(3000);
