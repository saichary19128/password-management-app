const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  account: String,
  password: String,
});

module.exports = mongoose.model('Password', passwordSchema);

