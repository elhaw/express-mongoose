const User = require('../models/userMode');

exports.getAllUsers = async (req, res, next) => {
  const data = await User.find();

  return res.json({ data });
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const data = await User.findById(id);

  res.status(200).json({ data });
};
