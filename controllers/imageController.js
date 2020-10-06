const cloudinary = require("cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;
const cloudinaryStorage = require("../util/cloudinary-custom-storage");
const Image = require('../models/imageModel');
const factory = require('./handlerFactory');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');

exports.setPostImageIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.image) req.body.image = req.image.id;
  next();
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



exports.getImage = factory.getOne(Image);
exports.uploadImage = (req, res) => {
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
};
exports.postImage= factory.createOne(Image);