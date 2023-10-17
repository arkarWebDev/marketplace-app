const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const storageConfigure = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});

const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

// routes imports
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express();

// global middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use(
  multer({ storage: storageConfigure, fileFilter: filterConfigure }).array(
    "product_images"
  )
);

// routes
app.use(authRoutes);
app.use(productRoutes);

mongoose.connect(process.env.MONGO_URL).then((_) => {
  app.listen(4000);
  console.log("Server is running at port : 4000");
});
