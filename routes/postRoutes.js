const express = require('express');
const postController = require('../controllers/postController');
const imageRouter = require('./imageRoutes');

const router = express.Router();

router.use('/:postId/images', imageRouter);

router
  .route('/')
  .post(
    postController.createPost
  );

  router
  .route('/:id')
  .get(postController.getPost)
  .patch(
    postController.uploadImages,
    postController.updatePost
  )

module.exports = router;