const express =require('express');
const imageController = require('./../controllers/imageController');


const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    imageController.uploadImage,
    imageController.postImage
  );

  router
  .route('/:id')
  .get(imageController.getImage);

module.exports = router;
