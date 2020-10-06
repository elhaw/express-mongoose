const express = require('express');
const connect = require('./lib/db');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const multer = require('multer');
const uuid = require('uuid').v4;
const cloudinaryStorage = require('./util/cloudinary-custom-storage');
const postRouter = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

app.use('/posts', postRouter);

const dbUrl =
  process.env.DB_URI || 'mongodb://localhost:27017/multer-m3ntorship';
const port = 3000;
connect(dbUrl)
  .then(() => {
    app.listen(port, function () {
      console.log('Listening on, port number ' + port);
    });
  })
  .catch(err => {
    console.log(err);
  });
