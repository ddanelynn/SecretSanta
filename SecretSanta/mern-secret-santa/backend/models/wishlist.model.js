const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  items: [{
    type: String,
    unique: true,
  }],
}, {
  timestamps: true,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;