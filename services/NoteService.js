const res = require('express/lib/response');
const NoteModel = require('../models/Note.model');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);
client.connect();  

//log error to the console if any occurs
client.on("error", (err) => {
    console.log(err);
});

class NoteService{
    

    //create new Note service
    static async createNewNote(data){
        try{
            // let isValid = this.isValidHttpUrl(data.body.url);
            let response={}

            const newNote = {
                note: data.body.note,
                user:'Test User',
            }

            response.data = await new NoteModel(newNote).save();
            response.success = true;
            return response;

        }
        catch(error){
            console.log(`Unable to create new note, ${error}`);
        }
    }

    // getAllNotes service
    static async getAllNotes(){
        try{
            const response = {};
            const data = await NoteModel.find();

            if(data.length>0){
                response.data = data;
                response.success = true;
            }
            else{
                response.data = [];
                response.success = true;
                response.message = '';
            }
            return response
        }
        catch(error){
            console.log(`Unable to get all Urls, ${error}`);
        }
    }
    
    // getNoteById 
    static async getNoteById(id) {
        try{
            let response = {}            
            let redisResponse = await client.get(id);
            
            if (redisResponse != null) {
                response.data = JSON.parse(redisResponse);
                response.success = true;
                response.message = 'retrieved from cache';
                return response;
            }
            else {
                const note = await NoteModel.findById(id);
                if (note) {
                    response.data = note;
                    response.success = true;
                    response.message = 'cache miss';
                    return response;
                } else {
                    response.data = [];
                    response.success = true;
                    response.message = 'Not found';
                    return response;
                }
            }
        }
        catch(error){
            console.log(`Unable to get note by Id, ${error}`);
        }
        
        
    }

    // Update Note By Id service
    static async updateNoteById(id,dataNote){
        try{ 
            let response={};
            const note = await NoteModel.findByIdAndUpdate(id,dataNote);
            if(note){
                response.data = [];
                response.success = true;
                response.message = 'Note deleted succesfuly';
            }else{
                response.data = [];
                response.success = true;
                response.message = 'Not found';
            }
            return response;
        }
        catch(error){
            console.log(`Unable to update note by Id, ${error}`);
        }
    }
    

    // Delete Note By Id service
    static async deleteNoteById(id){
        try{ 
            let response={};
            const note = await NoteModel.findByIdAndDelete(id);
            if(note){
                response.data = [];
                response.success = true;
                response.message = 'Note deleted succesfuly';
            }else{
                response.data = [];
                response.success = true;
                response.message = 'Not found';
            }
            return response;
        }
        catch(error){
            console.log(`Unable to delete Url by Id, ${error}`);
        }
    }


}

module.exports = NoteService;