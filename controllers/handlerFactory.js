const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const { Image } = require('../models/imageModel');
const { Resources } = require('../models/imageModel');
const User = require('../models/userMode');
const Post = require('../models/postModel');
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    if (!req.files.images) {
      return next(new AppError('Please Upload atleast one image', 400));
    }
    const images = req.files.images.map(image => {
      return {
        name: image.originalname.replace(' ', ''),
        url: image.path,
        provider: 'cloudinary'
      };
    });
    const image = await Image.create(images);
    const resources = await Resources.create({ images: image });
    const caption = req.body.caption;

    const user = await User.create({ name: 'asdadasd', email: 'asdasd' });
    const doc = await Model.create({
      caption,
      resources: resources._id,
      author: user._id
    });
    resources['images'].forEach(async img => {
      const image = await Image.findByIdAndUpdate(
        img,
        {
          linkedPost: doc._id
        },
        { new: true }
      ).exec();
      console.log(image);
    });
    res.status(201).json({
      status: 'success',
      data: doc
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions)
      query = query.populate(popOptions).populate('author').exec();
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

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const data = await Post.find().exec();
    if (!data) {
      return next(new AppError('No Polls found with that ID', 404));
    } else {
      res.status(200).json({ data });
    }
  });
