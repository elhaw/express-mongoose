const express = require('express');
const authController = require('../controllers/authController');
const activeEmailsController = require('../controllers/activeEmailsController');

const router = express.Router();

router.route('/auth/googlelogin').post(authController.googleLogin);

router.route('/').post(activeEmailsController.addActiveEmail);

module.exports = router;
