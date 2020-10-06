const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

const User = mongoose.model('user', userSchema);

module.exports = User;
