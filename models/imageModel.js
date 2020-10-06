const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  url: String,
  provider: String,
  upVote: {
    type: Number,
    default: 0
  }
});

const Image = mongoose.model('image', imageSchema);

const imagesSchema = new mongoose.Schema({
  images: {
    type: [],
    validate: v => Array.isArray(v) && v.length > 0
  }
});

const Images = mongoose.model('images', imagesSchema);
module.exports = {
  Image,
  Images
};
