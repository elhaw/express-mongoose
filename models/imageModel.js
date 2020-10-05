const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  name: String,
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);



const Image = mongoose.model("Image", imageSchema);
module.exports = Image;