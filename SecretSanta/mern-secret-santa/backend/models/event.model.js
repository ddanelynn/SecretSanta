const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  owner: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  // guests user ids
  // guests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  guests: [{ type: String }],
  name: { type: String, required: true },
  wishlist: { type: Schema.Types.ObjectId, ref: 'Wishlist' }
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;