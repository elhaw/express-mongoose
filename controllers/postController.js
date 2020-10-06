const cloudinary = require('cloudinary');
const multer = require('multer');
const factory = require('./handlerFactory');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const Post = require('../models/postModel');
const cloudinaryStorage = require('../util/cloudinary-custom-storage');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: cloudinaryStorage,
  fileFilter: multerFilter
});

exports.uploadImages = upload.fields([{ name: 'images', maxCount: 2 }]);

exports.getPost = factory.getOne(Post, 'images');
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
