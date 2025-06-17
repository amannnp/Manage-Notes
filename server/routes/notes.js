const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', auth, async (req, res) => {
  try {
    const q = req.query.q || '';
    const notes = await Note.find({
      user: req.userId,
      $or: [
        { heading: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  console.log(req.body)
  const { heading, content, color } = req.body;
  const note = new Note({
    user: req.userId,
    heading,
    content,
    color: color || '#ffffff', 
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// note by id
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// note edit
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const { heading, content, color } = req.body;
    if (heading !== undefined) note.heading = heading;
    if (content !== undefined) note.content = content;
    if (color !== undefined) note.color = color;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
