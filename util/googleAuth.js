const { google } = require('googleapis');

// Configure Google
const googleConfig = {
	clientId: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_SECRET,
	redirect: 'http://localhost:3000/auth/google/callback', // this must match your google api settings
};

// Create the google auth object which gives us access to talk to google's apis.
const oauth2Client = new google.auth.OAuth2(
	googleConfig.clientId,
	googleConfig.clientSecret,
	googleConfig.redirect
);

// Google Login URL
// default scope we want in our request
const defaultScope = [
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/userinfo.email',
];

// Google SignIn page URL
function getConnectionUrl(auth) {
	return auth.generateAuthUrl({
		access_type: 'offline',
		// access type and approval prompt will force a new refresh token to be made each time signs in
		prompt: 'consent',
		scope: defaultScope,
	});
}

// Google URL which will be sent to the client
function urlGoogle() {
	const url = getConnectionUrl(oauth2Client);
	return url;
}

module.exports = { googleAuthURL: urlGoogle(), oauth2Client };

/*
Google has given us a parameter on the redirect address called “code”. You will see this as:
https://yourwebsite.com/callback?code=a-bunch-of-random-characters
You need to extract this “code” parameter and give it back to the Google api library to check who the logged in user is
*/
