const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true
    },
    resources: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'resources',
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

// postSchema.virtual('votes').get(function () {
//   let votes = 0;
//   this.resources['images'].forEach();
// });
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
