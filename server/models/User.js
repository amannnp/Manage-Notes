const mongoose = require('mongoose');
//for user collection
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
