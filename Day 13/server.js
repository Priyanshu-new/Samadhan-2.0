const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/myNotesAppDB')
.then(() => {
  console.log("Database connection successful!");
})
.catch((err) => {
  console.error("Database connection failed.", err);
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('Note', noteSchema);

app.post('/notes', async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note." });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const allNotes = await Note.find({});
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes." });
  }
});

app.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note." });
  }
});

app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running! Check it out at http://localhost:${PORT}`);
});
