const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const { Image } = require('../models/imageModel');
const { Images } = require('../models/imageModel');
const User = require('../models/userMode');
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const images = req.files.images.map(image => {
      return {
        name: image.originalname.replace(' ', ''),
        url: image.path,
        provider: 'cloudinary'
      };
    });
    const image = await Image.create(images);
    const createdImages = await Images.create({ images: image });
    const caption = req.body.caption;

    const user = await User.create({ name: 'asdadasd', email: 'asdasd' });
    const doc = await Model.create({
      caption,
      images: createdImages._id,
      author: user._id
    });

    res.status(201).json({
      status: 'success',
      data: doc
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions).populate('author');
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
