const path = require("path");
const fs = require("fs");
const router = require("express").Router();
let parseNotes;
router.get("/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, notes) => {
        if (err){
            console.log(err);
            throw err;
        }
        
        parseNotes = (JSON.parse(notes));
        console.log("pullDataSuccess");
        
        return res.json(parseNotes);
   
    });
});
router.delete("/notes/:id", function (req, res) {
   
    var chosen = req.params.id;
    console.log(chosen)
    console.log(parseNotes[2].id)
   
    for (var i = 0; i < parseNotes.length; i++) {
        if (chosen === parseNotes.id) {
            parseNotes = parseNotes.splice(i, 1)
        
            fs.writeFile("../db/db.json", parseNotes)
            return res.json(parseNotes[i]);
        }
    }
    return res.json(false);
});
router.post("/notes", function (req, res) {
   
    console.log(parseNotes);
    const addNote = req.body;
    parseNotes.push(addNote);
    
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parseNotes), err => {
        if (err){
         
            console.log(err);
            throw err;
        }
        res.json(JSON.stringify(parseNotes));
        console.log("wrote file");    
        });        
});

module.exports = router;