const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/google').get(authController.getGoogleAuthUrl);
router
	.route('/activeemails')
	.post(authController.protect, authController.addActiveEmail);

router.route('/google/callback').get(authController.googleAuth);

module.exports = router;
