const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.post(
		authController.protect,
		postController.uploadImages,
		postController.createPost
	);

router
	.route('/:id')
	.get(authController.protect, postController.getPost)
	.patch(
		authController.protect,
		postController.uploadImages,
		postController.updatePost
	);

module.exports = router;
