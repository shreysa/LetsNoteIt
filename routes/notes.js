var express = require('express');
var router = express.Router();

/* GET notes listing. */



var notes = [];

// Handles Get Request
router.get('/', function(req, res, next)
{
    var data = {
        "status": "success",
         "data": {
            "num_notes": notes.length,
            "notes_data": notes
        }
    }
    
    res.status(200).json(data)
})


router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var is_number = true;
    
    if (parseInt(id) === "NaN") {
        is_number = false;
    }

    if((id > notes.length -1) || 
       (id < 0) || 
       !is_number) {
        res.status(404).send({
            "status": "failed",
            "message" : "Not Found"
        })
    }
    else {
        res.status(200).json({
            "status": "success",
            "data": {
                "notes_data": notes[id]
            }   
        })
    }
})

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    var is_number = true;
    
    if (parseInt(id) === "NaN") {
        is_number = false;
    }

    if((id > notes.length -1) || 
       (id < 0) || 
       !is_number) {
        res.status(404).send({
            "status": "failed",
            "message" : "Not Found"
        })
    }
    else {
        notes.splice(id, 1)
        res.status(200).json({
            "status": "success",
            "message": "note removed"
        })
    }   
})


router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var is_number = true;
    
    if (parseInt(id) === "NaN") {
        is_number = false;
    }

    if((id > notes.length -1) || 
       (id < 0) ||
       !is_number ) {
        res.status(404).send({
            "status": "failed",
            "message" : "Not Found"
        })
    }
    else {
        var note = notes[id];
        var updated_author = false;
        var updated_note_body = false;

        // Update note body if required
        if (req.body['note_body']) {
            note.note_body = req.body['note_body'];
            updated_note_body = true;
        }

        // Update note author if required
        if (req.body['author']) {
            note.author = req.body['author'];
            updated_author = true;
        }   

        if (updated_author || updated_note_body) {
            res.status(200).send({
                "status": "success",
                "message": "Note updated successfully"
            })
        }
        else {
            res.status(400).send({
                "status": "failure",
                "message": "No relevant data to update"
            })
        }
    }
})


router.post('/', function (req, res, next) {
    var previous_length = notes.length;
    if(req.body.hasOwnProperty("data")) {
        //adding the contents of the post request body
        for(var i = 0; i < req.body.data.length; i++) {
           notes.push(req.body.data[i]);
        }
    }
    else{
        res.status(400).send({
            "status": "failed",
            "message" : "Bad request"
    })
    }
    if (notes.length > previous_length) {
        res.status(200).send({"status": "success"})
    }
    else { 
        res.status(400).send({
            "status": "failed",
            "message" : "Bad request"
        })
    }
})

module.exports = router;