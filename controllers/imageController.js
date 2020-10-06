const cloudinary = require("cloudinary");
const multer = require("multer");
const uuid = require("uuid").v4;

const Image = require('../models/imageModel');
const factory = require('./handlerFactory');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');


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