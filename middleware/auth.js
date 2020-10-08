const { default: Axios } = require('axios');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userMode');
const catchAsync = require('../util/catchAsync');

exports.googleLogin = catchAsync(async (req, res, next) => {
  const idToken = req.body.tokenId;

  const { data } = await Axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );
  const { name, email, email_verified } = await data;

  if (email_verified) {
    const user = await User.findOne({ email });
    if (!user) {
      const user = await User.create({ email, name });
    }
  } else {
    res.status(401).json({});
  }

  res.status(200).send('Ya welcome');
});
