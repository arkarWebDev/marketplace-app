const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes imports
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express();

// global middlewares
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// routes
app.use(authRoutes);
app.use(productRoutes);

mongoose.connect(process.env.MONGO_URL).then((_) => {
  app.listen(4000);
  console.log("Server is running at port : 4000");
});
