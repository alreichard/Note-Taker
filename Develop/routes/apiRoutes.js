const path = require("path");
const fs = require("fs");

const router = require("express").Router();
let parseNotes;
router.get("/notes", function (req, res) {

    pullData(res)
    //res.json(parseNotes)
    //.catch((err) => res.status(500).json(err))
});

router.delete("/notes/:id", function (req, res) {
    var chosen = req.params.id;
    //pullData()
    for (var i = 0; i < parseNotes.length; i++) {
        if (chosen === parseNotes.id) {
            parseNotes.splice(i, 1)
                .then((notes) => fs.writeFile("../db/db.json", notes))
            return res.json(parseNotes[i]);
        }
    }

    return res.json(false);
});

router.post("/notes", function (req, res) {
    //pullData()
    const addNote = req.body
    parseNotes.push(addNote)
    console.log(parseNotes)
    
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parseNotes), err => {
            if (err){
            //res.status(500).json(err);
            console.log(err)
            throw err;
            }
            res.json(JSON.stringify(parseNotes))
            console.log("wrote file")
            
        })
        
});


function pullData(res) {
    return fs.readFile(path.join(__dirname, "../db/db.json"), (err, notes) => {
         if (err){
             console.log(err)
             throw err;
         }
            console.log(notes)
            parseNotes = (JSON.parse(notes))
            console.log("pullDataSuccess")
            console.log(parseNotes)
           res.json(parseNotes)
            //parseNotes = []
          //  console.log(err)
           // console.log(parseNotes)
            //res.status(500).json(err)
        

    })
}

module.exports = router