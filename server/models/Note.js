const mongoose = require('mongoose');
// for note collection of the user
const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  color: { type: String, default: '#ffffff' }, 
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
