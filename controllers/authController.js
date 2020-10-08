const { default: Axios } = require('axios');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userMode');
const ActiveEmails = require('../models/activeEmailsModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

exports.googleLogin = catchAsync(async (req, res, next) => {
	const idToken = req.body.id_token;
	const { data } = await Axios.get(
		`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
	);
	const { name, email, email_verified } = await data;
	if (!email_verified) {
		return next(
			new AppError(
				'Your email address has not been verified, please try to login again',
				400
			)
		);
	}
	console.log(email);
	if (!(await ActiveEmails.findOne({ email }))) {
		return next(
			new AppError(
				'Unfortunately, your email is not activated. We are still in beta.',
				403
			)
		);
	}
	const currentUser = await User.findOne({ email });
	if (!currentUser) {
		currentUser = await User.create({ email, name });
	}
	req.user = currentUser;
	res.status(200).send('Ya welcome');
});
