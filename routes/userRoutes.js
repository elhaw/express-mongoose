const express = require('express');
const authController = require('../controllers/authController');
const activeEmailsController = require('../controllers/activeEmailsController');

const router = express.Router();

router
	.route('/activated')
	.post(authController.protect, activeEmailsController.addActiveEmail);

module.exports = router;
