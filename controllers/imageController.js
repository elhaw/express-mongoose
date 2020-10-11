const multer = require('multer');

const { Image } = require('../models/imageModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../util/catchAsync');
const AppError = require('../util/appError');

// exports.getImage = factory.getOne(Image);

exports.getImage = async (req, res, next) => {
  const { id } = req.params;
  const image = await Image.findById(id);

  res.json({ image });
};
exports.uploadImage = (req, res) => {
  const upload = multer({
    storage: cloudinaryStorage
  }).array('image', 2);

  upload(req, res, err => {
    if (err) {
      res.send(err);
    }
    // storre images in database

    res.send(req.files);
  });
};
exports.postImage = factory.createOne(Image);

exports.upvote = catchAsync(async (req, res, next) => {
  const { imageId, userId } = req.body;
  const image = await Image.findById(imageId);
  if (!image) return next(new AppError('Image is not found', 404));
  if (image.votes.filter(user => user.toString() === userId).length === 0) {
    image.votes.push(userId);
    image.voutesCount = image.voutesCount + 1;
    await image.save();
    res.json({ image });
  } else {
    return next(new AppError('Already Voted', 400));
  }
});
