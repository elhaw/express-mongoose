const ActiveEmails = require('../models/activeEmailsModel');
const AppError = require('../util/appError');

exports.addActiveEmail = async (req, res, next) => {
  const activeEmail = await ActiveEmails.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      activeEmail
    }
  });
};
