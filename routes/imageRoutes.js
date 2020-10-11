const express = require('express');
const imageContorller = require('../controllers/imageController');
const router = express.Router();

router.route('/:id').put(imageContorller.upvote).get(imageContorller.getImage);
module.exports = router;
