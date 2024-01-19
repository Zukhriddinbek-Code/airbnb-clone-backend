const express = require("express");

const app = express();

app.get("/test", (req, res, next) => {
  res.json("test ok!");
});

app.listen(3000);
