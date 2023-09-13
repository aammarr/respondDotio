const { json } = require('express/lib/response');
const NoteService = require('../services/NoteService');

class Note{

    //apiGetAllNotes function
    static async apiGetAllNotes(req,res,next){
        try{
            const response = await NoteService.getAllNotes();
            return res.json({
                success : response.success,
                data    : response.data
            });
        }
        catch(error){
            res.status(500).json({error: error})
        }
    }

    //apiCreateNewNote function
    static async apiCreateNewNote(req,res,next){
        try{
            const newNote =  await NoteService.createNewNote(req);
            
            return res.json({
                success:newNote.success,
                data:req.body.note,
                message:newNote.data
            });
        }
        catch(error){
            res.status(500).json({error: error})
        }
    }

    // apiGetNoteById function
    static async apiGetNoteById(req,res,next){
        try{
            let id = req.params.id;
            const response =  await NoteService.getNoteById(id);
            
            return res.json({
                success:response.success,
                data:response.data,
                message:response.message
            });
        }
        catch(error){
            res.status(500).json({error: error})
        }
    }

    //apiUpdateNoteById
    static async apiUpdateNoteById(req,res,next){
        try{
            let id = req.params.id;
            const response =  await NoteService.updateNoteById(id,req.body.note);

            return res.json({
                success:response.success,
                data:[],
                message:response.message
            });
        }
        catch(error){
            res.status(500).json({error:error})
        }
    }

    //apiDeleteNoteById
    static async apiDeleteNoteById(req,res,next){
        try{
            let id = req.params.id;
            const response =  await NoteService.deleteNoteById(id);
            
            return res.json({
                success:response.success,
                data:[],
                message:response.message
            });
        }
        catch(error){
            res.status(500).json({error:error})
        }
    }
}

module.exports = Note;