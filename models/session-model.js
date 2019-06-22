const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, index: true, ref: 'user' },
});

module.exports = mongoose.model('session', sessionSchema);