const multer = require('multer');
const factory = require('./handlerFactory');
const AppError = require('./../util/appError');
const Post = require('../models/postModel');
const cloudinaryStorage = require('../util/cloudinary-custom-storage');
const { Resources } = require('../models/imageModel');

const multerStorage = multer.memoryStorage();

const acceptedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
const multerFilter = (req, file, cb) => {
  if (acceptedMimeTypes.includes(file.mimetype)) {
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

exports.getPost = factory.getOne(Post, 'resources');
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.getAllPosts = factory.getAll(Post);
