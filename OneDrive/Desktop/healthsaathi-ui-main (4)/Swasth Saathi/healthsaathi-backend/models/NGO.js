const mongoose = require('mongoose');
const NgoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  website: String,
  contact: String,
  tags: [String],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  createdAt: { type: Date, default: Date.now }
});
NgoSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('NGO', NgoSchema);
