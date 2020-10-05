const factory = require('./handlerFactory');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const Post = require('../models/postModel');

exports.getPost = factory.getOne(Post, { path: 'images' });
exports.createPost = factory.createOne(Post);