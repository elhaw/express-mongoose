const express = require("express");
const connect = require("./lib/db");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;
const cloudinaryStorage = require("./util/cloudinary-custom-storage");
require("dotenv").config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const imageSchema = new mongoose.Schema({
  url: String,
  name: String,
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },
});

const Image = mongoose.model("Image", imageSchema);

const postSchema = new mongoose.Schema(
  {
    caption: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("images", {
  ref: Image,
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

app.post("/upload", (req, res) => {
  const upload = multer({
    storage: cloudinaryStorage,
  }).array("image", 2);

  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    }
    // storre images in database

    res.send(req.files);
  });
});

app.get("/", (req, res) => {
  const post = new Post();
  post.save(function (err, data) {
    if (err) return console.error(err);
    res.send(data);
  });
});

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
