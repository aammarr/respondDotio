const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/note.controller');


router.get('/notes',NoteController.apiGetAllNotes);
router.post('/note',NoteController.apiCreateNewNote);
router.get('/note/:id',NoteController.apiGetNoteById);
router.get('/note/:id',NoteController.apiUpdateNoteById);
router.delete('/note/:id', NoteController.apiDeleteNoteById);

module.exports = router;    