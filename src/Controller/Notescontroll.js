import Note from '../Models/Notes.js'

export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id }).sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error){
        console.log("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal Server Isuue"})
    }
};

export const createNotes = async (req,res)=>{
    try{
        const {title,content,isImportant=false} = req.body
        const newNote = new Note({title,content,isImportant,user: req.user.id})
        await newNote.save()
        res.status(201).json({message:"Notes Created Successfully!"});
    }   catch (error){
        console.log("Error in createNotes controller",error)
        res.status(500).json({message:"Internal Server Isuue"})
    }
};

export const getNoteById = async (req,res)=>{
    try{
        const note = await Note.findOne({_id: req.params.id,user: req.user.id});
        if (!note) return res.status(404).json({message:"Note not found"})
        res.status(200).json(note)
    } catch(error){
        console.log("Error in getNoteById controller",error)
        res.status(500).json({message:"Internal Server Isuue"})
    }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id   
      },
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json({
      message: "Note Updated Successfully!",
      note: updatedNote
    });

  } catch (error) {
    console.log("Error in updateNotes controller", error);
    res.status(500).json({ message: "Internal Server Issue" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id 
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully!" });

  } catch (error) {
    console.log("Error in deleteNotes controller", error);
    res.status(500).json({ message: "Internal Server Issue" });
  }
};