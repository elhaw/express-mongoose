const express = require("express");
const connect = require("./lib/db");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;
const cloudinaryStorage = require("./util/cloudinary-custom-storage");
const imageRouter = require('./routes/imageRoutes');
const postRouter = require('./routes/postRoutes');
require("dotenv").config();

const app = express();

app.use('/posts', postRouter);
app.use('/images', imageRouter);

const dbUrl = process.env.DB_URI;
const port = 3000;
connect(dbUrl)
  .then(() => {
    app.listen(port, function () {
      console.log("Listening on, port number " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
