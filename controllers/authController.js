const User = require('../models/userMode');
const ActiveEmails = require('../models/activeEmailsModel');
const { googleAuthURL, oauth2Client } = require('../util/googleAuth');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

// todo:
//		1- Error Handling (Handling promise rejections)
//		2- More secure way of stopping direct requests to /google/callback
//		3- Improving/Iterating on the security gates of the protect function
//		4- Encrypting the google id before storing it into the database

const exchangeCodeForTokens = (code) => {
	return new Promise(async (resolve) => {
		const authCode = code;
		const { tokens } = await oauth2Client.getToken(authCode);
		oauth2Client.setCredentials(tokens);
		resolve(tokens);
	});
};

const verifyIdToken = (idToken) => {
	return new Promise(async (resolve) => {
		const clientId = process.env.GOOGLE_ID;
		const ticket = await oauth2Client.verifyIdToken({
			idToken,
			audience: clientId,
		});
		resolve(ticket);
	});
};

const getUserInfo = (id_token) => {
	return new Promise(async (resolve) => {
		const ticket = await verifyIdToken(id_token);
		const payload = ticket.getPayload();
		resolve(payload);
	});
};

exports.getGoogleAuthUrl = (req, res) => {
	res.redirect(googleAuthURL);
};

exports.googleAuth = async (req, res, next) => {
	if (!req.query.code)
		////////////////// MUST COME BACK TO THIS LATER //
		return next(
			new AppError('you have no permission to access this data', 401)
		);
	const { id_token } = await exchangeCodeForTokens(req.query.code);
	const { name, email, sub } = await getUserInfo(id_token);
	if (!(await User.findOne({ googleId: sub }))) {
		if (await ActiveEmails.findOne({ email }))
			await User.create({ name, email, googleId: sub });
		else
			return next(
				new AppError(
					'your email is not among the active emails, you cant register or log in',
					401
				)
			);
	}
	res.json(id_token);
};

exports.protect = catchAsync(async (req, res, next) => {
	const { id_token } = req.body;
	if (!id_token)
		return next(
			new AppError(
				'you are not logged in, please log in to gain access',
				401
			)
		);

	const { sub } = await getUserInfo(id_token);
	const user = await User.findOne({ googleId: sub });

	if (!user)
		return next(
			new AppError(
				'you are not registered, please sign up to gain access.',
				401
			)
		);

	req.user = user;
	next();
});

exports.addActiveEmail = catchAsync(async (req, res, next) => {
	await ActiveEmails.create({ email: req.body.email });
	res.status(201).json({
		status: 'success',
		message:
			'new active email has been added to the db. this email can now register to use beta.',
	});
});
