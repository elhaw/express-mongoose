const mongoose = require('mongoose');
const Image  = require('./imageModel')
const postSchema = new mongoose.Schema(
  {
    caption: String,
    images: [{
      type: String,
      required: [true, 'A post must have images']
    }],
  },
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
