const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// routes imports
const authRoutes = require("./routes/auth");

const app = express();
app.use(authRoutes);

mongoose.connect(process.env.MONGO_URL).then((_) => {
  app.listen(4000);
  console.log("Server is running at port : 4000");
});
