import express from 'express';
const router = express.Router();
import protect from '../Middleware/middleware.js'
import Note from '../Models/Notes.js'
import { getAllNotes, createNotes, updateNote, deleteNotes, getNoteById } from '../Controller/Notescontroll.js';
router.get('/',protect, getAllNotes);

router.get('/:id',protect,getNoteById)

router.post('/',protect,createNotes);

router.put('/:id',protect,updateNote);

router.delete('/:id',protect,deleteNotes);

router.patch("/:id/toggle-important",protect, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.isImportant = !note.isImportant;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.patch("/:id/toggle-complete",protect, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user._id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    note.isCompleted = !note.isCompleted;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;

