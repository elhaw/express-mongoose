const mongoose = require('mongoose');
const { isEmail } = require('validator');

const activeEmailsSchema = new mongoose.Schema({
	email: {
		type: String,
		validate: [
			isEmail,
			'The email you entered is invalid, Please Enter a valid email address',
		],
	},
});

const ActiveEmails = mongoose.model('activeEmail', activeEmailsSchema);

module.exports = ActiveEmails;