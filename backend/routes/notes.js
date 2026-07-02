const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// ROUTE1 : get all the notes using GET : api/notes/fetchnotes // login required
router.get('/fetchnotes', fetchuser, async (req, res) => {

  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes)
  } catch (error) {
    console.error(error.message);
  }

})


// ROUTE 2 : add the notes using POST : api/notes/addnotes // login required

router.post('/addnotes', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'description must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {

  try {
    const { title, description, tag } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const note = new Notes({
      title, description, tag, user: req.user.id
    })

    const savedNote = await note.save()
    res.json(savedNote)
  }

  catch (error) {
    console.error(error.message);
  }
})


// ROUTE 3 : update the notes using PUT : api/notes/updatenotes // login required


router.put('/updatenote/:id', fetchuser, async (req, res) => {

  const { title, description, tag } = req.body;
  //create a newNote object

  const newNote = {};

  if (title) { newNote.title = title };
  if (description) { newNote.description = description };
  if (tag) { newNote.tag = tag };

  // finde the note to be updated and update it 
   let note = await Notes.findById(req.params.id)

  if (!note) {
    return res.status(404).send("Not Found")
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed")
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote } , {new:true})
  res.json({note})

})

// ROUTE 4 : delete the note using DELETE : api/notes/deletenote // login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

 

  

  // finde the note to be deleted and delete it 
   let note = await Notes.findById(req.params.id)

  if (!note) {
    return res.status(404).send("Not Found")
  }
 // Allow deletion of note if only authenticated 
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed")
  }
  note = await Notes.findByIdAndDelete(req.params.id)
   res.send("note deleted");
})

module.exports = router