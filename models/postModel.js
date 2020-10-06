const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true
    },
    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'images',
      required: true
    },
    isAnonymous: {
      type: Boolean,
      default: false
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
