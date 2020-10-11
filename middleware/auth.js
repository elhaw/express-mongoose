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
    if (user) {
      // Create Token and set it in cookie && Check if the user Active Then respond with data
      if (user.active) {
        res
          .status(200)
          .json({ active: true, msg: 'Welcome you are logged in' });
      }
    } else {
      const newUser = await User.create({ email, name });
      // Then Create token => set in cookie = > respond
    }
  } else {
    res.status(400).json({
      err: `Google Login Faild Try Again`
    });
  }

  res.status(200).send('Ya welcome');
});
