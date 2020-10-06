const mongoose = require('mongoose');
const Image  = require('./imageModel')
const postSchema = new mongoose.Schema(
  {
    caption: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("images", {
  ref: Image,
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
