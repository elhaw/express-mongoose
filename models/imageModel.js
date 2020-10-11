const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  url: String,
  provider: String,
  // upVote: {
  //   type: Number,
  //   default: 0
  // }
  linkedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  voutesCount: {
    type: Number,
    default: 0
  }
});

const Image = mongoose.model('image', imageSchema);

const resourcesSchema = new mongoose.Schema({
  images: {
    type: [],
    validate: v => Array.isArray(v) && v.length > 0
  }
});

const Resources = mongoose.model('resources', resourcesSchema);
module.exports = {
  Image,
  Resources
};
