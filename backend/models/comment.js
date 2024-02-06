const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  game: String,
  image: String,
  text: String
})

module.exports = mongoose.model('Comment', commentSchema)