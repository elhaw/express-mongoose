const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.route('/').post(postController.uploadImages, postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.uploadImages, postController.updatePost);

module.exports = router;
